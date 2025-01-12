const mongoose = require("mongoose");
const Reservation = require("../models/reservation-model");
const User = require("../models/user-model");
const Listing = require("../models/listing-model");

const createReservation = async (req, res, next) => {
  try {
    const userId = req.userId;
    const {
      tourId,
      title,
      name,
      primaryPhoneNo,
      secondaryPhoneNo,
      primaryEmail,
      secondaryEmail,
      address,
      guests,
      checkInDate,
      checkOutDate,
      price,
    } = req.body;

    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res.status(400).json({ msg: "Invalid tour ID." });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const listing = await Listing.findById(tourId);
    if (!listing) {
      return res.status(404).json({ msg: "Tour not found." });
    }

    let status = "Pending";
    if (listing.reservationType === "Automatic") {
      status = "Approved";
    }

    const newReservation = new Reservation({
      reserverId: userId,
      tourId,
      title,
      name,
      primaryPhoneNo,
      secondaryPhoneNo,
      primaryEmail,
      secondaryEmail,
      address,
      guests,
      checkInDate,
      checkOutDate,
      price,
      status,
    });

    await newReservation.save();

    res.status(201).json({
      success: true,
      msg: `Booking ${status}`,
      reservation: newReservation,
    });
  } catch (error) {
    console.error("Error creating reservation", error.message);
    next(error);
  }
};

const deleteReservation = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { tourId } = req.body;

    const reservation = await Reservation.findById(tourId);

    if (!reservation) {
      return res.status(404).json({ msg: "Reservation not found." });
    }

    if (reservation.reserverId.toString() !== userId) {
      return res
        .status(403)
        .json({ msg: "You are not authorized to cancel this booking." });
    }
    await Reservation.deleteOne({ _id: tourId });
    
    res.status(200).json({
      success: true,
      msg: "Reservation cancelled successfully.",
    });
  } catch (error) {
    console.error("Error deleting reservation", error.message);
    next(error);
  }
};


const getMyReservations = async (req, res, next) => {
  try {
    const userId = req.userId;
    const userOwnedListings = await Listing.find({ owner: userId }).select('_id');
    const listingIds = userOwnedListings.map((listing) => listing._id);
    const reservations = await Reservation.find({ tourId: { $in: listingIds } });

    res.status(200).json({
      success: true,
      reservations,
    });
  } catch (error) {
    console.error("Error fetching reservations:", error.message);
    next(error);
  }
};

const getMyReservationById = async (req, res, next) => {
  try {
    const { reservationId } = req.body;
    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ success: false, msg: "reservation not found." });
    }

    res.status(200).json({
      success: true,
      reservation,
    });
  } catch (error) {
    console.error("Error fetching reservation by ID:", error.message);
    next(error);
  }
};

const updateStatus = async (req, res, next) => {
  try {
    const { reservationId, status } = req.body;

    const reservation = await Reservation.findById(reservationId);

    if (!reservation) {
      return res.status(404).json({ msg: "Reservation not found." });
    }

    reservation.status = status;
    await reservation.save();

    res.status(200).json({
      success: true,
      msg: `Reservation ${status.toLowerCase()} successfully.`,
      reservation,
    });
  } catch (error) {
    console.error("Error updating reservation status:", error.message);
    next(error);
  }
};





module.exports = { createReservation, deleteReservation, getMyReservations, getMyReservationById, updateStatus };
