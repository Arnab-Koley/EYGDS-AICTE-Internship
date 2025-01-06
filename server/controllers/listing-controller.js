const Listing = require("../models/listing-model");
const User = require("../models/user-model");

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
      return res.status(404).json({ msg: "User not found." });
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
      safetyDetails,
    });

    await newListing.save();

    res.status(201).json({
      success: true,
      msg: "Listing created successfully.",
      listing: newListing,
    });
  } catch (error) {
    console.error("Error creating listing:", error.message);
    next(error);
  }
};

const updateListing = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { listingId, listing: updatedListingData } = req.body;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, msg: "Listing not found." });
    }

    if (listing.owner.toString() !== userId) {
      return res
        .status(403)
        .json({
          success: false,
          msg: "You are not authorized to update this listing.",
        });
    }
    Object.assign(listing, updatedListingData);

    await listing.save();

    res.status(200).json({
      success: true,
      msg: "Listing updated successfully.",
      listing,
    });
  } catch (error) {
    console.error("Error updating listing:", error.message);
    next(error);
  }
};

const getMyListings = async (req, res, next) => {
  try {
    const userId = req.userId;
    const listings = await Listing.find({ owner: userId });

    if (!listings.length) {
      return res
        .status(404)
        .json({ success: false, msg: "No listings found for this user." });
    }

    res.status(200).json({
      success: true,
      listings,
    });
  } catch (error) {
    console.error("Error fetching user-specific listings:", error.message);
    next(error);
  }
};

const getListingById = async (req, res, next) => {
  try {
    const { listingId } = req.body;
    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, msg: "Listing not found." });
    }

    res.status(200).json({
      success: true,
      listing,
    });
  } catch (error) {
    console.error("Error fetching listing by ID:", error.message);
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { listingId, status, statusMsg } = req.body;
    const userId = req.userId;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, msg: "Listing not found." });
    }
    if (listing.owner.toString() !== userId) {
      return res
        .status(403)
        .json({
          success: false,
          msg: "You are not authorized to update this listing.",
        });
    }

    listing.status = status;
    listing.statusMsg = statusMsg || "";

    await listing.save();

    res.status(200).json({
      success: true,
      msg: "Status updated",
    });
  } catch (error) {
    console.error("Error updating listing status:", error.message);
    next(error);
  }
};

const updateListingTimes = async (req, res, next) => {
  try {
    const { listingId, checkInTime, checkOutTime } = req.body;
    const userId = req.userId;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, msg: "Listing not found." });
    }
    if (listing.owner.toString() !== userId) {
      return res
        .status(403)
        .json({
          success: false,
          msg: "You are not authorized to update this listing.",
        });
    }
    listing.checkInTime = checkInTime;
    listing.checkOutTime = checkOutTime;

    await listing.save();

    res.status(200).json({
      success: true,
      msg: "Times updated",
    });
  } catch (error) {
    console.error("Error updating listing times:", error.message);
    next(error);
  }
};


const updateReservationType = async (req, res, next) => {
  try {
    const { listingId, reservationType } = req.body;
    const userId = req.userId;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, msg: "Listing not found." });
    }
    if (listing.owner.toString() !== userId) {
      return res
        .status(403)
        .json({
          success: false,
          msg: "You are not authorized to update this listing.",
        });
    }

    listing.reservationType = reservationType;

    await listing.save();

    res.status(200).json({
      success: true,
      msg: "Reservation Type updated",
    });
  } catch (error) {
    console.error("Error updating reservation type:", error.message);
    next(error);
  }
};

const updateRefundPolicy = async (req, res, next) => {
  try {
    const { listingId, refundPolicy } = req.body;
    const userId = req.userId;

    const listing = await Listing.findById(listingId);

    if (!listing) {
      return res
        .status(404)
        .json({ success: false, msg: "Listing not found." });
    }
    if (listing.owner.toString() !== userId) {
      return res
        .status(403)
        .json({
          success: false,
          msg: "You are not authorized to update this listing.",
        });
    }
    listing.refundPolicy = refundPolicy;

    await listing.save();

    res.status(200).json({
      success: true,
      msg: "Policy updated",
    });
  } catch (error) {
    console.error("Error updating Policy:", error.message);
    next(error);
  }
};

module.exports = {
  createListing,
  updateListing,
  getMyListings,
  getListingById,
  updateStatus,
  updateListingTimes,
  updateReservationType,
  updateRefundPolicy,
};
