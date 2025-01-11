const express = require('express');
const router = express.Router();
const reservationcontroller = require('../controllers/reservation-controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/createreservation',verifyToken,reservationcontroller.createReservation);
router.post('/deletereservation',verifyToken,reservationcontroller.deleteReservation);

module.exports = router;