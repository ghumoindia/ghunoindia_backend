const mongoose = require("mongoose");
const imageSchema = require("./image");

const foodSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    about: String,
    coverImage: imageSchema,
    slideshowImages: [imageSchema],

    cityIds: [
      {
        value: { type: mongoose.Schema.Types.ObjectId, ref: "City" },
        label: String,
      },
    ],
    stateIds: [
      {
        value: { type: mongoose.Schema.Types.ObjectId, ref: "State" },
        label: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Food", foodSchema);
