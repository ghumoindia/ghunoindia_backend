// models/experience.js
const mongoose = require("mongoose");
const imageSchema = require("./image");

const experienceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String, required: true },

    cityId: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
    stateId: { type: mongoose.Schema.Types.ObjectId, ref: "State" },

    category: { type: String }, // e.g., "adventure", "cultural", "wellness"

    coverImage: imageSchema,
    slideshowImages: [imageSchema],

    duration: { type: String }, // e.g., "3 hours", "2 days"
    price: { type: Number }, // Optional pricing

    isFeatured: { type: Boolean, default: false },
    isHidden: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Experience", experienceSchema);
