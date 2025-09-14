const mongoose = require("mongoose");
const imageSchema = require("./image");

const wonderSchemas = new mongoose.Schema(
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

    stateIds: [
      {
        value: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "State",
          required: false,
        },
        label: { type: String, required: false },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Wonders", wonderSchemas);
