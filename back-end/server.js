// back-end/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Position = require('./my_model/Position');  // Import the Position

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Geo_location', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Error connecting to MongoDB:', err));

// Define route to save position
app.post('/api/save-position', async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        const newPosition = new Position({
            latitude,
            longitude,
        });

        await newPosition.save();  // Save to MongoDB

        res.status(200).json({ message: 'Position saved successfully!' });
    }
    catch (error) {
        console.error('Error saving position:', error);
        res.status(500).json({ message: 'Failed to save position', error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
