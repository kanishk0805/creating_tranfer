require("dotenv").config();
const mongoose = require('mongoose');
 
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGOOSE_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:');
    console.error(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;