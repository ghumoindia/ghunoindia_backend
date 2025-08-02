const mongoose = require("mongoose");
const imageSchema = require("./image");

const stateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: String,
    about: String,
    coverImage: imageSchema,
    slideshowImages: [imageSchema],
    cityIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "City", required: false },
    ],
    placeIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Places", required: false },
    ],
    foodIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Foods", required: false },
    ],
    activitiesIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "activity",
        required: false,
      },
    ],
    hotelsIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Hotel", required: false },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("State", stateSchema);
