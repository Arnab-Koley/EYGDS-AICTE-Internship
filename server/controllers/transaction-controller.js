const Razorpay = require('razorpay');
const Transaction = require('../models/transaction-model');
const Reservation = require('../models/reservation-model');
const User = require('../models/user-model');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res, next) => {
  const { amount, currency, reservationId } = req.body;

  try {
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ success: false, message: 'Reservation not found' });
    }

    const options = {
      amount: amount * 100,
      currency,
      receipt: `receipt_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log(order)
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error("Error creating payment order:", error.message);
    next(error);
  }
};

const verifyPayment = async (req, res, next) => {
    const userId = req.userId;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, reservationId, amount } = req.body;
  
    const hmac = crypto.createHmac('sha256', process.env.RAZORPAY_KEY_SECRET);
    hmac.update(`${razorpay_order_id}|${razorpay_payment_id}`);
    const generated_signature = hmac.digest('hex');
  
    if (generated_signature === razorpay_signature) {
      try {
        const paymentDetails = await razorpay.payments.fetch(razorpay_payment_id);
  
        // Capture the actual payment method used (e.g., 'upi', 'card', etc.)
        console.log(paymentDetails);
        const paymentMethodUsed = paymentDetails.method; // This can be 'upi', 'card', 'wallet', etc.
  
        const transaction = new Transaction({
          reservationId,
          userId,
          amount,
          method: paymentMethodUsed, 
          status: 'completed',
          transactionId: razorpay_payment_id,
        });
  
        await transaction.save();
  
        await Reservation.findByIdAndUpdate(reservationId, { status: 'Paid' });
  
        res.status(200).json({ success: true, message: 'Payment verified and recorded successfully' });
      } catch (error) {
        console.error("Error verifying payment:", error.message);
        next(error);
      }
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature' });
    }
  };


  const getDetails = async (req, res, next) => {
    const userId = req.userId; 
    const { tourId } = req.body; 
  
    try {
      const transaction = await Transaction.findOne({
        reservationId: tourId, 
      });
  
      if (!transaction) {
        return res.status(404).json({ success: false, message: 'Transaction not found' });
      }

      if (transaction.userId.toString() !== userId.toString()) {
        return res.status(403).json({ success: false, message: 'You are not authorized to view this transaction' });
      }
  
      res.status(200).json({
        success: true,
        transaction: transaction,
      });
    } catch (error) {
      console.error('Error fetching transaction details:', error.message);
      next(error);
    }
  };
  
  

module.exports = { createOrder, verifyPayment, getDetails };
