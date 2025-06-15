const mongoose = require("mongoose");
const imageSchema = require("./image");

const citySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    image: String,
    about: String,
    coverImage: imageSchema,
    slideshowImages: [imageSchema],
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

module.exports = mongoose.model("City", citySchema);
