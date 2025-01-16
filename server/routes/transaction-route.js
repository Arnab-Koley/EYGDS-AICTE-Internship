const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transaction-controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/createorder', verifyToken, transactionController.createOrder);
router.post('/verify', verifyToken, transactionController.verifyPayment);
router.post('/getdetails', verifyToken, transactionController.getDetails);

module.exports = router;
