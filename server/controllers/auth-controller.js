const User = require('../models/user-model');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail');
const sendVerificationEmail = require('../utils/sendVerificationEmail');


const signup = async (req,res,next) => {
    try {

        const {email,name,password,gender} = req.body;
        const userExist = await User.findOne({email:email});
        if(userExist){
            const error = {
                status: 400,
                msg: "User already exists.",
            };
            return next(error);
        }

        let profileImg = '';
        switch (gender) {
            case 'Male':
                profileImg = 'https://cdn.vectorstock.com/i/1000v/54/69/male-user-icon-vector-8865469.jpg';
                break;
            case 'Female':
                profileImg = 'https://cdn.vectorstock.com/i/1000v/23/70/default-avatar-profile-icon-vector-18942370.jpg';
                break;
            case 'Other':
                profileImg = 'https://cdn.vectorstock.com/i/1000v/53/14/transgender-symbol-isolated-on-white-trans-gender-vector-39695314.jpg';
                break;
            default:
                profileImg = '';
        }

        const userCreated = await User.create({email,name,password,gender,profileImg,account:'email'});
        
        res.status(201).json(
            {
                msg:"Signed up successfully.",
                token: await userCreated.generateToken(),
                userId: userCreated._id.toString(),
            }
        );
    } catch (error) {
        next(error);
    }
}


const login = async (req,res,next) => {
    try {
        const {email,password} = req.body;
        const userExist = await User.findOne({email});
        if(!userExist){
            const error = {
                status: 400,
                msg: "User doesn't exists.",
            };
            return next(error);
        }
        if(userExist.googleId){
            const error = {
                status: 400,
                msg: "This account is associated with Google login. Please use the 'Sign in with Google' option.",
            };
            return next(error);
        }
        const user = await userExist.comparePassword(password);
    
      
        if(user){
            res.status(200).json(
                {
                    msg:"Logged in successfully",
                    token: await userExist.generateToken(),
                    userId: userExist._id.toString(),
                    profileImg: userExist.profileImg,
                    verified: userExist.isVerified,
                    completed: userExist.isCompleted,
                    account: userExist.account,
                }
            );
        }
        else{
            const error = {
                status: 400,
                msg: "Invalid Password",
            };
            return next(error);
        }
    } catch (error) {
        next(error);
    }
}




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

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetPasswordToken = crypto.createHash('sha256').update(otp).digest('hex');
        const resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 minutes
        user.resetPasswordExpire = resetPasswordExpire;

        await user.save();


        await sendEmail(user.email, otp); // Send OTP instead of resetToken

        res.status(200).json({
            msg: "OTP sent to your email",
        });

    } catch (error) {
        next(error);
    }
};


const resetPassword = async (req, res, next) => {
    const { otp, password } = req.body; // OTP and new password from the user

    try {
        // Hash the OTP for comparison
        const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');

        // Find the user with the matching OTP and not expired
        const user = await User.findOne({
            resetPasswordToken: hashedOTP,
            resetPasswordExpire: { $gt: Date.now() }
        });

        if (!user) {
            // Check if OTP is expired
            const expiredUser = await User.findOne({
                resetPasswordToken: hashedOTP,
                resetPasswordExpire: { $lte: Date.now() }
            });

            if (expiredUser) {
                // OTP is expired
                const error = {
                    status: 400,
                    msg: "OTP has expired. Please request a new OTP."
                };
                return next(error);
            }

            // OTP is invalid
            const error = {
                status: 400,
                msg: "Invalid OTP. Please check and try again."
            };
            return next(error);
        }

        // OTP is valid, proceed to reset the password
        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save();

        res.status(200).json({ msg: 'Password has been reset successfully.' });

    } catch (error) {
        // Pass any unexpected error to the error handler
        next(error);
    }
}



const verifyProfileRequest = async (req, res, next) => {
    const { userId } = req.body;

    try {
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return next({ status: 400, msg: "User does not exist." });
        }

        if (user.isVerified) {
            return res.status(400).json({ msg: "Profile is already verified." });
        }

        // Generate a 6-digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("Generated OTP:", otp);

        user.profileVerificationToken = crypto.createHash('sha256').update(otp).digest('hex');
        user.profileVerificationExpire = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes expiry

        await user.save();

        await sendVerificationEmail(user.email, otp);

        res.status(200).json({ msg: "OTP sent to your email." });
    } catch (error) {
        next(error);
    }
};



const verifyProfile = async (req, res, next) => {
    const { otp } = req.body;

    try {
        const hashedOTP = crypto.createHash('sha256').update(otp).digest('hex');
        console.log("Hashed OTP Received:", hashedOTP);

        const user = await User.findOne({
            profileVerificationToken: hashedOTP,
        });

        if (!user) {
            return next({ status: 400, msg: "Invalid OTP. Please check and try again." });
        }

        if (user.profileVerificationExpire <= Date.now()) {
            return next({ status: 400, msg: "OTP has expired. Please request a new OTP." });
        }

        // Verify profile
        user.isVerified = true;
        user.isCompleted = true;
        user.profileVerificationToken = undefined;
        user.profileVerificationExpire = undefined;

        await user.save();

        res.status(200).json({ msg: "Profile verified successfully." });
    } catch (error) {
        next(error);
    }
};



module.exports = {signup,login,forgotPassword,resetPassword,verifyProfileRequest,verifyProfile};