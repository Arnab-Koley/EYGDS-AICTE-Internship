
const User = require('../models/user-model');
const validate = require('./validators');

const validateSignup = async (req, res, next) => {
    const { email, name, password } = req.body;

    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            const error = {
                status: 400,
                msg: "User already exists.",
            };
            return next(error);
        }

        let errorMsg = validate.emailValidator(email) ||
            validate.nameValidator(name) ||
            validate.passwordValidator(password);

        if (errorMsg) {
            const error = {
                status: 400,
                msg: errorMsg,
            };
            return next(error);
        }

        next();

    } catch (error) {
        next(error);
    }
};

const validateLogin = async (req, res, next) => {
    const { email, password } = req.body;

    let errorMsg = validate.emailValidator(email);

    if (errorMsg) {
        const error = {
            status: 400,
            msg: errorMsg,
        };
        return next(error);
    }

    try {
        // Check if the user exists first
        const userExist = await User.findOne({ email });
        if (!userExist) {
            const error = {
                status: 400,
                msg: "User doesn't exist.",
            };
            return next(error);
        }

        // Now check if the password is provided
        if (!password) {
            const error = {
                status: 400,
                msg: 'Password is required.',
            };
            return next(error);
        }

        next(); // Pass control to the login controller if validation passes

    } catch (error) {
        next(error);
    }
};

const validateForgotPassword = async (req, res, next) => {
    const { email} = req.body;

    let errorMsg = validate.emailValidator(email);

    if (errorMsg) {
        const error = {
            status: 400,
            msg: errorMsg,
        };
        return next(error);
    }

    try {
        // Check if the user exists first
        const userExist = await User.findOne({ email });
        if (!userExist) {
            const error = {
                status: 400,
                msg: "User doesn't exist.",
            };
            return next(error);
        }

        next();

    } catch (error) {
        next(error);
    }
};

const validateResetPassword = async (req, res, next) => {
    const { password } = req.body;

    let errorMsg = validate.passwordValidator(password);

    if (errorMsg) {
        const error = {
            status: 400,
            msg: errorMsg,
        };
        return next(error);
    }
    next();
};


module.exports = {
    validateSignup,
    validateLogin,
    validateForgotPassword,
    validateResetPassword,
};
