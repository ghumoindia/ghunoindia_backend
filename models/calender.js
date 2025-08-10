const mongoose = require("mongoose");

const stateEntrySchema = new mongoose.Schema(
  {
    stateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
      required: true,
    },
    name: { type: String, required: true },
    subtitle: String,
    image: String,
    cities: [String],
    reason: String,
    temp: String,
    rating: { type: Number, default: 4.5 },
    bestFor: [String],
    famousFor: String,
  },
  { _id: false }
);

const travelCalendarSchema = new mongoose.Schema(
  {
    year: { type: Number, required: true, default: new Date().getFullYear() },
    monthNumber: { type: Number, required: true, min: 1, max: 12 }, // 1-12
    month: { type: String, required: true }, // "January", "February", etc.
    season: { type: String, required: true },
    weather: String,
    description: String,
    states: [stateEntrySchema],
  },
  {
    timestamps: true,
    versionKey: "version",
    optimisticConcurrency: true,
  }
);

// Create compound index to ensure unique month per year
travelCalendarSchema.index({ year: 1, monthNumber: 1 }, { unique: true });

module.exports = mongoose.model("Calender", travelCalendarSchema);
