const Listing = require('../models/listing-model');


const getAllTours = async (req, res, next) => {
    try {
        const tours = await Listing.find(); 
        if (!tours.length) {
            return res.status(404).json({ success: false, msg: 'No tours found.' });
        }
        res.status(200).json({
            success: true,
            tours,
        });
    } catch (error) {
        console.error('Error fetching tours:', error.message);
        next(error);
    }
};

const getTourById = async (req, res, next) => {
    try {
      const { tourId } = req.body;
      const tour = await Listing.findById(tourId);
  
      if (!tour) {
        return res.status(404).json({ success: false, msg: 'Tour not found.' });
      }
  
      res.status(200).json({
        success: true,
        tour,
      });
    } catch (error) {
      console.error('Error fetching tour by ID:', error.message);
      next(error);
    }
  };

module.exports = {
    getAllTours, getTourById,
};