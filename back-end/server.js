const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); // Use Mongoose for MongoDB

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/geo_location', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB!');
}).catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
});

// Define a Schema and Model for storing positions
const positionSchema = new mongoose.Schema({
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    created_at: { type: Date, default: Date.now },
});

const Position = mongoose.model('Position', positionSchema);

// Simple route
app.get('/', (req, res) => {
    res.send('Hello from the backend with MongoDB!');
});

// Location-saving route
app.post('/api/save-position', async (req, res) => {
    const { latitude, longitude } = req.body;

    try {
        const newPosition = new Position({ latitude, longitude });
        await newPosition.save();
        res.status(200).json({ message: 'Position saved successfully!' });
    } catch (error) {
        console.error('Error saving position to the database:', error);
        res.status(500).json({ message: 'Failed to save position', error: error.message });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
