const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    filename: String,
    originalname: String,
    size: Number,
    mimetype: String,
    url: { type: String, required: true },
    public_id: String, // optional: for cloud storage
  },
  { _id: false }
);

module.exports = imageSchema;
