const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listing-controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/createlisting', verifyToken, listingController.createListing);
router.put('/updatelisting', verifyToken, listingController.updateListing);
router.get('/getmylistings', verifyToken, listingController.getMyListings);
router.post('/getlistingbyid', verifyToken, listingController.getListingById);

router.post('/updatelistingstatus',verifyToken,listingController.updateStatus);

module.exports = router;