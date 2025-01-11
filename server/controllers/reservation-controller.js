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

module.exports = { createReservation, deleteReservation };
