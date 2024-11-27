// src/services/locationController.js

const Position = require("../../../back-end/my_model/Position.js");

// Controller function to handle fetching coordinates
const getCoordinatesHistory = async (req, res) => {
    try {
        const position = await Position.find()
            .sort({ timestamp: 1}) // Sort by timestamp in descending order
            .limit(3) // Get the last 3 coordinates
        res.status(200).json(position || []);
    }
    catch (error) {
        // console.error("Error fetching coordinates:", error);
        res.status(500).json({ error: "Error fetching coordinates: "});
    }
};

module.exports = { getCoordinatesHistory };
