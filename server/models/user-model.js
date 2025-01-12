

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        lowercase: true,
        trim: true,
    },
    name: {
        type: String,
        required: [true, 'Name is required'],
        trim: true,
    },
    phone: {
        type: String,
        default: null,
    },
    
    password: {
        type: String,
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        default: 'Other', 
    },
    googleId: {
        type: String, 
    },
    profileImg: {
        type: String,
        default: '',
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    account: {
        type: String,
    },
    emailVerificationToken: String,
    emailVerificationExpire: Date,
    isMailVerified: {
        type: Boolean,
        default: false,
    },
    phoneVerificationToken: String,
    phoneVerificationExpire: Date,
    isPhoneVerified: {
        type: Boolean,
        default: false,
    },
    isCompleted: {
        type: Boolean,
        default: false,
    },
    wishlist: {
        type: [String],
        default: [],
    },
}, { timestamps: true });



userSchema.pre('save', async function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(user.password, salt);
        user.password = hashedPassword;
        next();
    } catch (error) {
        next(error);
    }
});


userSchema.methods.generateToken = async function() {
    try {
        const token = jwt.sign(
            {
                userId: this._id.toString(),
                email: this.email,
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '15d' } 
        );
        return token;
    } catch (error) {
        console.error('JWT Generation Error:', error);
    }
};

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};


const User = mongoose.model('User', userSchema);
module.exports = User;
