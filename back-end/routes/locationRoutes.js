// back-end/config/locationRoutes.js

const express = require('express');
const router = express.Router();
const locationController = require('../../front-end/src/services/locationController');

// Define the routes for fetching all coordinates
router.get('/coordinates', locationController.getCoordinatesHistory);
module.exports = router;

