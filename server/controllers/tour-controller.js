const Listing = require("../models/listing-model");
const Reservation = require("../models/reservation-model");

const getAllTours = async (req, res, next) => {
  try {
    const tours = await Listing.find({ status: { $ne: "hidden" } });

    res.status(200).json({
      success: true,
      tours,
    });
  } catch (error) {
    console.error("Error fetching tours:", error.message);
    next(error);
  }
};

const getTourById = async (req, res, next) => {
  try {
    const { tourId } = req.body;
    const tour = await Listing.findById(tourId);

    if (!tour) {
      return res.status(404).json({ success: false, msg: "Tour not found." });
    }

    res.status(200).json({
      success: true,
      tour,
    });
  } catch (error) {
    console.error("Error fetching tour by ID:", error.message);
    next(error);
  }
};

const getToursByIds = async (req, res, next) => {
  try {
    const { tourIds } = req.body;
    if (!Array.isArray(tourIds) || tourIds.length === 0) {
      return res
        .status(400)
        .json({
          success: false,
          msg: "Invalid input, tourIds should be an array.",
        });
    }

    const tours = await Listing.find({ _id: { $in: tourIds } });

    if (!tours.length) {
      return res
        .status(404)
        .json({ success: false, msg: "No tours found for the provided IDs." });
    }

    res.status(200).json({
      success: true,
      tours,
    });
  } catch (error) {
    console.error("Error fetching tours by IDs:", error.message);
    next(error);
  }
};

const getMyTours = async (req, res, next) => {
  try {
    const userId = req.userId;
    const reservations = await Reservation.find({ reserverId: userId });
    res.status(200).json({
      success: true,
      myTours: reservations,
    });
  } catch (error) {
    console.error("Error fetching user tours:", error.message);
    next(error);
  }
};

const getMyTourById = async (req, res, next) => {
  try {
    const { tourId } = req.body;
    const tour = await Reservation.findById(tourId);

    if (!tour) {
      return res.status(404).json({ success: false, msg: "Tour not found." });
    }

    res.status(200).json({
      success: true,
      tour,
    });
  } catch (error) {
    console.error("Error fetching tour by ID:", error.message);
    next(error);
  }
};

module.exports = {
  getAllTours,
  getTourById,
  getToursByIds,
  getMyTours,
  getMyTourById,
};
