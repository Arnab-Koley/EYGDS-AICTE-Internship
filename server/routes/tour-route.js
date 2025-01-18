const express = require('express');
const router = express.Router();
const tourcontroller = require('../controllers/tour-controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/getalltour', tourcontroller.getAllTours);
router.post('/gettourbyid',tourcontroller.getTourById);
router.post('/gettoursbyids',tourcontroller.getToursByIds);
router.get('/getmytours',verifyToken,tourcontroller.getMyTours);
router.post('/getmytourbyid',verifyToken,tourcontroller.getMyTourById);


module.exports = router;