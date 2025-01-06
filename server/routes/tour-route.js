const express = require('express');
const router = express.Router();
const tourcontroller = require('../controllers/tour-controller');
const verifyToken = require('../middlewares/verifyToken');

router.get('/getalltour', tourcontroller.getAllTours);
router.post('/gettourbyid',tourcontroller.getTourById);

module.exports = router;