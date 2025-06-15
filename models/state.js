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
      {
        value: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "City",
          required: true,
        },
        label: { type: String, required: true },
      },
    ],
    placeIds: [
      {
        value: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Place",
          required: true,
        },
        label: { type: String, required: true },
      },
    ],
    foodIds: [
      {
        value: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: true,
        },
        label: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("State", stateSchema);
