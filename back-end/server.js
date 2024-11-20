// back-end/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./config/db.js'); // Import db instead of { query }

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simple route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Location-saving route
app.post('/api/save-position', (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        db.query(
            'INSERT INTO positions (latitude, longitude) VALUES (?, ?)',
            [latitude, longitude],
            (error, results) => {
                if (error) {
                    console.error("Error saving position to the database:", error);
                    return res.status(500).json({ message: 'Failed to save position', error: error.message });
                }
                res.status(200).json({ message: 'Position saved successfully!' });
            }
        );
    }  catch (error) {
        console.error("Error saving position to the database:", error);
        res.status(500).json({ message: 'Failed to save position', error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
