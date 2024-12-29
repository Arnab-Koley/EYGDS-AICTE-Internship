const mongoose = require('mongoose');

const listingSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    geography: {
        type: String,
        required: true,
    },
    propertyType: {
        type: String,
        required: true,
    },
    accommodationType: {
        type: String,
        required: true,
    },
    address: {
        country: {
            type: String,
            required: true,
        },
        region: {
            type: String,
            required: true,
        },
        flatHouse: {
            type: String,
            default: '',
        },
        streetAddress: {
            type: String,
            required: true,
        },
        landmark: {
            type: String,
            default: '',
        },
        districtLocality: {
            type: String,
            default: '',
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
        specificLocation: {
            type: String,
            default: '',
        },
    },
    basics: {
        guests: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },
        bedrooms: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },
        beds: {
            type: Number,
            required: true,
            min: 1, 
            default: 1,
        },
        bathrooms: {
            type: Number,
            required: true,
            min: 1,
            default: 1,
        },
    },
    amenities: {
        type: [String],
        default: [],
    },
    standoutAmenities: {
        type: [String],
        default: [],
    },
    safetyItems: {
        type: [String],
        default: [],
    },
    title: {
        type: String,
        required: true,
        maxlength: 32,
    },
    description: {
        type: String,
        required: true,
        maxlength: 500,
    },
    coverPhoto: {
        type: String,
        required: true,
    },
    photos: {
        type: [String],
        default: [],
    },
    price: {
        type: Number,
        required: true,
        min: 0,
    },
    discount: {
        percentage: {
            type: Number,
            min: 0,
            max: 100,
            default: 0,
        },
        discountMsg: {
            type: String,
            default: '',
        },
    },
    safetyDetails: {
        exteriorSecurityCamera: {
            type: Boolean,
            default: false,
        },
        noiseDecibelMonitor: {
            type: Boolean,
            default: false,
        },
        weaponsOnProperty: {
            type: Boolean,
            default: false,
        },
        safetyInfo: {
            type: String,
            default: '',
        },
    },
}, { timestamps: true });


const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
