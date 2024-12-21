const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/auth-controller');
const validate = require('../middlewares/validateMiddleware');
const verifyToken = require('../middlewares/verifyToken');

router.post('/signup', validate.validateSignup, authcontroller.signup);
router.post('/login', validate.validateLogin, authcontroller.login);
router.post('/forgotpassword', validate.validateForgotPassword, authcontroller.forgotPassword);
router.put('/resetpassword', validate.validateResetPassword, authcontroller.resetPassword);
router.post('/verifyprofilerequest', authcontroller.verifyProfileRequest);
router.put('/verifyprofile', authcontroller.verifyProfile);


module.exports = router;