const express = require('express');
const router = express.Router();
// const { getCoordinatesHistory } = require("./locationController.js");
const locationController = require("./locationController.js");

// Expose the API endpoint
router.get('/coordinates', locationController.getCoordinatesHistory);

module.exports = router;

