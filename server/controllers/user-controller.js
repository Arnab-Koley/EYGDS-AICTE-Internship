const User = require('../models/user-model');

const getUserData = async (req, res, next) => {
  try {
  
    const userId = req.userId; // Corrected to match middleware

    const user = await User.findById(userId).select('-password -__v');

    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    res.status(200).json({
      success: true,
      user: {
        name: user.name,
        gender: user.gender,
        host: user.isHost,
      },
    });
  } catch (error) {
    console.error('Error fetching user data:', error.message);
    next(error);
  }
};



const completeProfile = async (req, res, next) => {
    try {
    
      const userId = req.userId; 
      const {name,gender,isHost} = req.body;
  
      const existedUser = await User.findById(userId);
  
      if (!existedUser) {
        return res.status(404).json({ msg: 'User not found.' });
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

module.exports = { getUserData,completeProfile };
