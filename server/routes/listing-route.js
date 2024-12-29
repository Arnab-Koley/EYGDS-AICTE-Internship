const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listing-controller');
const verifyToken = require('../middlewares/verifyToken');

router.post('/createlisting', verifyToken, listingController.createListing);
router.get('/getalllistings', verifyToken, listingController.getAllListings);

module.exports = router;
