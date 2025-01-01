const Listing = require('../models/listing-model');
const User = require('../models/user-model');

// Create a new listing
const createListing = async (req, res, next) => {
  try {
    const userId = req.userId;
    const {
      geography,
      propertyType,
      accommodationType,
      address,
      title, 
      description,
      coverPhoto, 
      basics,
      amenities,
      standoutAmenities,
      safetyItems,
      guestType,
      price,
      safetyDetails,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found.' });
    }

    const newListing = new Listing({
      owner: userId,
      geography,
      propertyType,
      accommodationType,
      address,
      title, 
      description,
      coverPhoto, 
      basics,
      amenities,
      standoutAmenities,
      safetyItems,
      guestType,
      price,
      safetyDetails
    });

    await newListing.save();

    res.status(201).json({
      success: true,
      msg: 'Listing created successfully.',
      listing: newListing,
    });
  } catch (error) {
    console.error('Error creating listing:', error.message);
    next(error);
  }
};


const getMyListings = async (req, res, next) => {
    try {
      const userId = req.userId; 
      const listings = await Listing.find({ owner: userId });
  
      if (!listings.length) {
        return res.status(404).json({ success: false, msg: 'No listings found for this user.' });
      }
  
      res.status(200).json({
        success: true,
        listings,
      });
    } catch (error) {
      console.error('Error fetching user-specific listings:', error.message);
      next(error);
    }
  };


  const getAllListings = async (req, res, next) => {
    try {
      const userId = req.userId; 
      const listings = await Listing.find();
      if (!listings.length) {
        return res.status(404).json({ success: false, msg: 'No listings found for this user.' });
      }
  
      res.status(200).json({
        success: true,
        listings,
      });
    } catch (error) {
      console.error('Error fetching user-specific listings:', error.message);
      next(error);
    }
  };

  

module.exports = { createListing, getAllListings };
