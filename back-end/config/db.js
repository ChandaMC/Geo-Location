// back-end/config/db.js

const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/geo_location', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB!');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
