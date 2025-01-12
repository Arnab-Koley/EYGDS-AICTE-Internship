const User = require("../models/user-model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const twilio = require("twilio");
const sendEmail = require("../utils/sendEmail");
const sendVerificationEmail = require("../utils/sendVerificationEmail");
const sendPhoneOTP = require("../utils/sendPhoneOTP");

const signup = async (req, res, next) => {
  try {
    const { email, name, password, gender } = req.body;
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      const error = {
        status: 400,
        msg: "User already exists.",
      };
      return next(error);
    }

    let profileImg = "";
    switch (gender) {
      case "Male":
        profileImg =
          "https://github.com/Arnab-Koley/EYGDS-AICTE-Internship/blob/main/client/src/assets/icon/male-profile.png?raw=true";
        break;
      case "Female":
        profileImg =
          "https://github.com/Arnab-Koley/EYGDS-AICTE-Internship/blob/main/client/src/assets/icon/female-profile.png?raw=true";
        break;
      case "Other":
        profileImg =
          "https://github.com/Arnab-Koley/EYGDS-AICTE-Internship/blob/main/client/src/assets/icon/profile.png?raw=true";
        break;
      default:
        profileImg = "";
    }

    const userCreated = await User.create({
      email,
      name,
      password,
      gender,
      profileImg,
      account: "email",
    });

    res.status(201).json({
      msg: "Signed up successfully.",
      token: await userCreated.generateToken(),
      userId: userCreated._id.toString(),
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      const error = {
        status: 400,
        msg: "User doesn't exists.",
      };
      return next(error);
    }
    if (userExist.googleId) {
      const error = {
        status: 400,
        msg: "This account is associated with Google login. Please use the 'Sign in with Google' option.",
      };
      return next(error);
    }
    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Logged in successfully",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
        profileImg: userExist.profileImg,
        completed: userExist.isCompleted,
        account: userExist.account,
      });
    } else {
      const error = {
        status: 400,
        msg: "Invalid Password",
      };
      return next(error);
    }
  } catch (error) {
    next(error);
  }
};

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      const error = {
        status: 400,
        msg: "User with this email does not exist.",
      };
      return next(error);
    }

   
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetPasswordToken = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
    const resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    user.resetPasswordExpire = resetPasswordExpire;

    await user.save();

    await sendEmail(user.email, otp); 

    res.status(200).json({
      msg: "OTP sent to your email",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  const { otp, password } = req.body; 

  try {
   
    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");


    const user = await User.findOne({
      resetPasswordToken: hashedOTP,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
    
      const expiredUser = await User.findOne({
        resetPasswordToken: hashedOTP,
        resetPasswordExpire: { $lte: Date.now() },
      });

      if (expiredUser) {
   
        const error = {
          status: 400,
          msg: "OTP has expired. Please request a new OTP.",
        };
        return next(error);
      }

   
      const error = {
        status: 400,
        msg: "Invalid OTP. Please check and try again.",
      };
      return next(error);
    }


    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ msg: "Password has been reset successfully." });
  } catch (error) {
    next(error);
  }
};

const verifyEmailRequest = async (req, res, next) => {
  const userId = req.userId;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return next({ status: 400, msg: "User does not exist." });
    }

    if (user.isMailVerified) {
      return next({ status: 400, msg: "Your Email is already verified." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.emailVerificationToken = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
    user.emailVerificationExpire = new Date(Date.now() + 10 * 60 * 1000); 

    await user.save();

    await sendVerificationEmail(user.email, otp);

    res.status(200).json({ msg: "OTP sent to your email." });
  } catch (error) {
    next(error);
  }
};

const verifyEmail = async (req, res, next) => {
  const { otp } = req.body;

  try {
    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
      emailVerificationToken: hashedOTP,
    });

    if (!user) {
      return next({
        status: 400,
        msg: "Invalid OTP. Please check and try again.",
      });
    }

    if (user.emailVerificationExpire <= Date.now()) {
      return next({
        status: 400,
        msg: "OTP has expired. Please request a new OTP.",
      });
    }


    user.isMailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;

    await user.save();

    res.status(200).json({ msg: "Email verified successfully." });
  } catch (error) {
    next(error);
  }
};

const verifyPhoneRequest = async (req, res, next) => {
  const userId = req.userId;
  const { phone } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return next({ status: 400, msg: "User does not exist." });
    }

    if (user.isPhoneVerified) {
      return next({ status: 400, msg: "Your Phone is already verified." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.phoneVerificationToken = crypto
      .createHash("sha256")
      .update(otp)
      .digest("hex");
    user.phoneVerificationExpire = new Date(Date.now() + 10 * 60 * 1000);

    await user.save();

    // TWILIO SUBSCRIPTION IS NEEDED

    // const accountSid = process.env.TWILIO_ACCOUNT_SID;
    // const authToken = process.env.TWILIO_AUTH_TOKEN;
    // const twilioClient = new twilio(accountSid, authToken);

    // try{
    //     await twilioClient.messages.create({
    //         body: `Your OTP to verify your mobile number with Desh Deskho is ${otp}. This OTP is valid for 10 minutes. Please do not share this OTP with anyone.`,
    //         to: phone,
    //         from: process.env.TWILIO_PHONE_NUMBER,
    //       });
    // } catch(e){
    //     console.log(e)
    // }

    // OTP WILL SEND VIA EMAIL AS THIS IS TWILIO CLIENT ACCOUNT

    await sendPhoneOTP(user.email, otp);

    res.status(200).json({ msg: "OTP sent to your mobile." });

  } catch (error) {
    next(error);
  }
};

const verifyPhone = async (req, res, next) => {
  const { phone, otp } = req.body;

  try {
    const hashedOTP = crypto.createHash("sha256").update(otp).digest("hex");

    const user = await User.findOne({
      phoneVerificationToken: hashedOTP,
    });

    if (!user) {
      return next({
        status: 400,
        msg: "Invalid OTP. Please check and try again.",
      });
    }

    if (user.phoneVerificationExpire <= Date.now()) {
      return next({
        status: 400,
        msg: "OTP has expired. Please request a new OTP.",
      });
    }

  
    user.phone = phone;
    user.isPhoneVerified = true;
    user.phoneVerificationToken = undefined;
    user.phoneVerificationExpire = undefined;

    await user.save();

    res.status(200).json({ msg: "Phone verified successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  verifyEmailRequest,
  verifyEmail,
  verifyPhoneRequest,
  verifyPhone,
};
