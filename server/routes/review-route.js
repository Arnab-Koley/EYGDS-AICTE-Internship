const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review-controller');

router.post('/getreviewbyid', reviewController.getReviewById);

module.exports = router;
