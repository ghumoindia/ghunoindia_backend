const mongoose = require("mongoose");
const imageSchema = require("./image");

const citySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    subtitle: String,

    image: String,
    about: String,
    coverImage: imageSchema,
    slideshowImages: [imageSchema],
    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: false,
    },
    placeIds: [
      {
        value: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Place",
          required: false,
        },
        label: { type: String, required: false },
      },
    ],
    foodIds: [
      {
        value: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Food",
          required: false,
        },
        label: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);
