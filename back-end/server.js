const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Simple route
app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.post('/api/save-position', (req, res) => {
    const { latitude, longitude } = req.body;
    console.log(`Received Position: Lat ${latitude}, Lon ${longitude}`);

    const query = 'INSERT INTO positions (latitude, longitude) VALUES (?, ?)';
    db.query(query, [latitude, longitude], (err, results) => {
        if (err) {
            console.error('Error saving position:', err);
            return res.status(500).json({ message: 'Error saving position' });
        }
        res.json({ message: 'Position saved successfully', id: results.insertId });
    });
});

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: '', // replace with your MySQL password
    database: 'geo_location',
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL database');
});
