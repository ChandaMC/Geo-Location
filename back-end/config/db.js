// back-end/config/db.js

const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root', // replace with your MySQL username
    password: '', // replace with your MySQL password
    database: 'geo_location',
    port: '3307'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err);
        return;
    }
    console.log('Connected to MySQL config');
});

module.exports = db;
