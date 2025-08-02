const mongoose = require("mongoose");
const imageSchema = require("./image");

const roomSchema = new mongoose.Schema({
  type: { type: String },
  price: { type: Number },
  totalRooms: { type: Number, default: 1 },
  amenities: [String],
  images: [imageSchema],
  description: String,
  isAvailable: { type: Boolean, default: true },
});

const hotelSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    about: { type: String },
    coverImage: imageSchema,
    slideshowImages: [imageSchema],
    stateIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "State" }],

    address: {
      line1: { type: String },
      line2: { type: String },
      city: { type: String },
      pincode: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
    },

    rooms: [roomSchema],
    facilities: [String],
    policies: {
      checkIn: String,
      checkOut: String,
      cancellation: String,
    },

    contact: {
      phone: String,
      email: String,
    },

    isActive: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Hotel", hotelSchema);
