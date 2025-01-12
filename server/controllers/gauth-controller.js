const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model'); 

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
       
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId, picture } = payload;

 
        let user = await User.findOne({ email });

        if (user && !user.googleId) {
      
            return res.status(400).json({
                message: "Email already registered. Please log in with email & password.",
            });
        }

        if (!user) {
          
            user = await User.create({
                email,
                name,
                googleId,
                password: '', 
                gender: 'Other',
                profileImg: picture || '', 
                isMailVerified:true,
                account: 'google',
            });
        }

       
        const jwtToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: "15d" });


        return res.status(200).json({
            token: jwtToken,
            userId: user._id,
            profileImg: picture,
            completed: false,
            account: 'google',
            msg: "Login successful",
        });
    } catch (error) {
        console.error("Google Login Error:", error);
        return res.status(400).json({ message: "Invalid Google Token" });
    }
};

module.exports = { googleLogin };
