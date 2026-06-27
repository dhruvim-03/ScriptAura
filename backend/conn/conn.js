const mongoose = require("mongoose");

const conn = async () => {
  try {
    await mongoose.connect(process.env.URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("DB error:", err);
  }
};

module.exports = conn;