const Review = require('../models/review-model'); 
const Listing = require('../models/listing-model'); 

const getReviewById = async (req, res, next) => {
  try {
    const { tourId } = req.body;

    const tour = await Listing.findById(tourId);
    if (!tour) {
      return res.status(404).json({ success: false, msg: 'Tour not found.' });
    }

    const reviews = await Review.find({ tour: tourId }).populate('reviewer', 'rating', 'feedback');

    res.status(200).json({
      success: true,
      reviews,
    });
  } catch (error) {
    console.error('Error fetching reviews by tourId:', error.message);
    next(error);
  }
};

module.exports = {
  getReviewById,
};
