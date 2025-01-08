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
      status,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: "User not found." });
    }

    const listing = await Listing.findById(tourId);
    if (!listing) {
      return res.status(404).json({ msg: "Tour not found." });
    }

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

    await newReservation.save();

    res.status(201).json({
      success: true,
      msg: "Reservation successful.",
      reservation: newReservation,
    });
  } catch (error) {
    console.error("Error creating reservation", error.message);
    next(error);
  }
};

module.exports = { createReservation };
