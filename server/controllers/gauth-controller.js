const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/user-model'); // Import your User model

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Controller for Google Login
const googleLogin = async (req, res) => {
    const { token } = req.body;

    try {
        // Verify the Google ID token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub: googleId, picture } = payload;

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user && !user.googleId) {
            // Conflict if the account exists but was created without Google
            return res.status(400).json({
                message: "Email already registered. Please log in with email & password.",
            });
        }

        if (!user) {
            // Create a new user if it does not exist
            user = await User.create({
                email,
                name,
                googleId,
                password: '', // Set empty password for Google-authenticated users
                gender: 'Other', // Default gender
                profileImg: picture || '', // Store Google profile image if available
                isMailVerified:true,
                account: 'google',
            });
        }

        // Generate JWT token for authentication
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
