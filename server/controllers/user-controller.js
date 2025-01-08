const User = require("../models/user-model");

const getUserData = async (req, res, next) => {
  try {
    const userId = req.userId;


    const user = await User.findById(userId).select("-password -__v");

    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    res.status(200).json({
      success: true,
      user: {
        email: user.email,
        name: user.name,
        phone: user.phone,
        gender: user.gender,
        profileImg: user.profileImg,
        account: user.account,
        isMailVerified: user.isMailVerified,
        isPhoneVerified: user.isPhoneVerified,
        isCompleted: user.isCompleted,
        wishlist: user.wishlist,
      },
    });
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    next(error);
  }
};

const completeProfile = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { name, gender, isHost } = req.body;

    const existedUser = await User.findById(userId);

    if (!existedUser) {
      return res.status(404).json({ msg: "User not found." });
    }

    existedUser.name = name;
    existedUser.gender = gender;
    existedUser.isHost = isHost;

    await existedUser.save();
    res.status(200).json({ msg: "Profile updated successfully" });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

const getHost = async (req, res, next) => {
  try {
    const { hostId } = req.body;

    const host = await User.findById(hostId);

    if (!host) {
      return res.status(404).json({ msg: "Host not found." });
    }

    res.status(200).json({
      success: true,
      host: {
        name: host.name,
        profileImg: host.profileImg,
        createdAt: host.createdAt,
      },
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};


const updateWishlist = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { tourId } = req.body;

    const existedUser = await User.findById(userId);

    if (!existedUser) {
      return res.status(404).json({ msg: "User not found." });
    }

    const wishlistIndex = existedUser.wishlist.indexOf(tourId);

    if (wishlistIndex > -1) {
      existedUser.wishlist.splice(wishlistIndex, 1);
      res.status(200).json({
        success: true,
        msg: "Removed from wishlist",
      });
    } else {
      existedUser.wishlist.push(tourId);
      res.status(200).json({
        success: true,
        msg: "Added to wishlist",
      });
    }

    await existedUser.save();
  } catch (error) {
    console.error("Error updating wishlist:", error.message);
    next(error);
  }
};



module.exports = { getUserData, completeProfile,getHost,updateWishlist };
