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
    basics: {
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
    guestType:{
        adult: {
            type: Boolean,
            default: true,
        },
        teen: {
            type: Boolean,
            default: true,
        },
        child: {
            type: Boolean,
            default: true,
        },
        infant: {
            type: Boolean,
            default: true,
        },
        pet: {
            type: Boolean,
            default: true,
        }
    },
    price: {
        adult: {
            type: Number,
            default: 0,
            min: 0,
        },
        teen: {
            type: Number,
            default: 0,
            min: 0,
        },
        child: {
            type: Number,
            default: 0,
            min: 0,
        },
        infant: {
            type: Number,
            default: 0,
            min: 0,
        },
        pet: {
            type: Number,
            default: 0,
            min: 0,
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
      
    photos: {
        type: [String],
        default: [],
    },
    rating: {
        type: Number,
        default: 0,
    }

    
}, { timestamps: true });


const Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
