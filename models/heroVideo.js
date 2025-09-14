const mongoose = require("mongoose");

const heroVideo = new mongoose.Schema(
  {
    title: { type: String, required: true },
    videoUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("HeroVideo", heroVideo);
