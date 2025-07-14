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
    stateIds: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
        required: false,
      },
    ],

    placeIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Places", required: false },
    ],
    foodIds: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Foods", required: false },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("City", citySchema);
