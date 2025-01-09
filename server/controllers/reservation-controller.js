const mongoose = require("mongoose");
const Reservation = require("../models/reservation-model");
const User = require("../models/user-model");
const Listing = require("../models/listing-model");

const createReservation = async (req, res, next) => {
  try {
    const userId = req.userId;
    const {
      tourId,
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

    // Validate if tourId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(tourId)) {
      return res.status(400).json({ msg: "Invalid tour ID." });
    }

    // Find the user by userId
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    // Find the listing by tourId
    const listing = await Listing.findById(tourId);
    if (!listing) {
      return res.status(404).json({ msg: "Tour not found." });
    }

    // Determine the status based on reservationType
    let status = "Pending";
    if (listing.reservationType === "Automatic") {
      status = "Approved";
    }

    // Create the new reservation
    const newReservation = new Reservation({
      reserverId: userId,
      tourId,
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

    // Save the reservation
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

module.exports = { createReservation };
