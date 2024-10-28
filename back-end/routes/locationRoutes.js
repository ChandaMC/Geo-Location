// back-end/config/locationRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../config/db'); // Make sure this points to your MySQL setup

router.post('api/save-position', (req, res) => {
    const { latitude, longitude } = req.body;

    // SQL query to insert position
    const sql = 'INSERT INTO positions (latitude, longitude) VALUES (?, ?)';
    db.query(sql, [latitude, longitude], (error, results) => {
        if (error) {
            console.error("Error saving position:", error);
            return res.status(500).send("Server error");
        }
        res.status(200).send("Position saved successfully!");
    });
});

console.log("Received data:", req.body);

module.exports = router;
