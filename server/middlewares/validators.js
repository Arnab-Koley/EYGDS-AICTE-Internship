
const emailValidator = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    if (!email) {
        return 'Email is required.';
    }
    if (!emailRegex.test(email)) {
        return 'Invalid email format.';
    }
    return null;
};


const passwordValidator = (password) => {
    if (!password) {
        return 'Password is required.';
    }

    if (password.length < 6) {
        return 'Password must be at least 6 characters long.';
    }

    const errors = [];

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must include at least 1 uppercase letter.');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('Password must include at least 1 lowercase letter.');
    }
    if (!/\d/.test(password)) {
        errors.push('Password must include at least 1 number.');
    }
    if (!/[@$!%*?&]/.test(password)) {
        errors.push('Password must include at least 1 special character.');
    }

    if (errors.length > 0) {
        return errors;
    }

    return null;
};



const nameValidator = (name) => {
    if (!name) {
        return 'Name is required.';
    }
    if (name.length < 2) {
        return 'Name must be at least 2 characters long.';
    }
    return null;
};

module.exports = {
    emailValidator,
    passwordValidator,
    nameValidator,
};