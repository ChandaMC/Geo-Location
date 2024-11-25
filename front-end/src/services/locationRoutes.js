const express = require('express');
const router = express.Router();
const { getCoordinatesHistory } = require("./locationController.js");

// Expose the API endpoint
router.get('/coordinates', getCoordinatesHistory);

module.exports = router;

