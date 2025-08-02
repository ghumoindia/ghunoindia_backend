// models/activities.js

const mongoose = require("mongoose");
const imageSchema = require("./image");

const activitySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Activity name is required"],
    },
    description: {
      type: String,
    },
    coverImage: imageSchema,
    slideshowImages: [imageSchema],
    price: {
      type: Number,
      required: false,
    },
    duration: {
      type: String,
      required: false,
    },
    activityType: {
      type: String,
      enum: ["outdoor", "indoor", "virtual"],
      required: false,
    },
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("activity", activitySchema);
