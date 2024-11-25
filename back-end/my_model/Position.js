// my_model/Position.js

const mongoose = require('mongoose');

// Define a schema for the position data
const positionSchema = new mongoose.Schema({
    latitude: {type: Number, required: true},
    longitude: {type: Number, required: true},
    timestamp: {type: Date, default: Date.now()},
});
// Create a my_model based on the schema
const Position = mongoose.model('geo_position', positionSchema);

module.exports = Position;

