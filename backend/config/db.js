const mongoose = require("mongoose");

const DB_URI = process.env.ATLASDB_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log("MongoDb connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

module.exports = connectDB;
