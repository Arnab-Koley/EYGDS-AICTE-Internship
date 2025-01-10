const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema(
  {
    reserverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tourId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    primaryPhoneNo: {
      type: String,
      required: true,
    },
    secondaryPhoneNo: {
      type: String,
      default: "",
    },
    primaryEmail: {
        type: String,
        required: true,
      },
      secondaryEmail: {
        type: String,
        default: "",
      },
    address: {
      country: {
        type: String,
        required: true,
      },
      flatHouse: {
        type: String,
        default: "",
      },
      streetAddress: {
        type: String,
        required: true,
      },
      landmark: {
        type: String,
        default: "",
      },
      districtLocality: {
        type: String,
        default: "",
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      pinCode: {
        type: String,
        required: true,
      },
    },
    guests: {
      adult: {
        type: Number,
        required: true,
        min: 1,
      },
      teen: {
        type: Number,
        required: true,
        min: 0,
      },
      child: {
        type: Number,
        required: true,
        min: 0,
      },
      infant: {
        type: Number,
        required: true,
        min: 0,
      },
      pet: {
        type: Number,
        required: true,
        min: 0,
      },
    },
    checkInDate: {
      type: Date,
      required: true,
    },
    checkOutDate: {
      type: Date,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
