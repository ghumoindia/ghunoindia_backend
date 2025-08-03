// models/destination.js
const mongoose = require("mongoose");
const imageSchema = require("./image");

const destinationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    stateName: { type: String, required: true },
    subtitle: { type: String },
    about: { type: String, required: true },

    stateIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }],
    cityIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "City" }],

    coverImage: imageSchema,
    slideshowImages: [imageSchema],
    tags: [String], // e.g., ["hill station", "heritage", "beach"]

    isPopular: { type: Boolean, default: false },
    isHidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Destination", destinationSchema);
