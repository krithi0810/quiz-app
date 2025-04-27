const mongoose = require('mongoose');
require('dotenv').config();

const uri = process.env.MONGODB_URI;
console.log('MONGODB_URI:', uri);

mongoose.connect(uri)
  .then(() => {
    console.log('Connected to MongoDB');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });