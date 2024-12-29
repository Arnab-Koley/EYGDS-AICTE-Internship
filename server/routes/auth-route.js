const express = require('express');
const router = express.Router();
const authcontroller = require('../controllers/auth-controller');
const validate = require('../middlewares/validateMiddleware');
const verifyToken = require('../middlewares/verifyToken');

router.post('/signup', validate.validateSignup, authcontroller.signup);
router.post('/login', validate.validateLogin, authcontroller.login);
router.post('/forgotpassword', validate.validateForgotPassword, authcontroller.forgotPassword);
router.put('/resetpassword', validate.validateResetPassword, authcontroller.resetPassword);
router.post('/verifyemailrequest',verifyToken, authcontroller.verifyEmailRequest);
router.put('/verifyemail',verifyToken, authcontroller.verifyEmail);
router.post('/verifyphonerequest',verifyToken, authcontroller.verifyPhoneRequest);
router.put('/verifyphone',verifyToken, authcontroller.verifyPhone);


module.exports = router;