const express = require('express');
const router = express.Router();
const usercontroller = require('../controllers/user-controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/getuser', verifyToken, usercontroller.getUserData);
router.post('/completeprofile',verifyToken,usercontroller.completeProfile);
router.post('/gethost',usercontroller.getHost);
router.post('/updatewishlist',verifyToken,usercontroller.updateWishlist);

module.exports = router;