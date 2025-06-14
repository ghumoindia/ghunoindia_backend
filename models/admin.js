const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: [true, "Email is required"],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
    },
    role: {
      type: String,
      enum: [
        "super-admin",
        "content-manager",
        "hotel-manager",
        "car-manager",
        "guide-manager",
      ],
      default: "content-manager",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    refreshToken: {
      type: String,
      default: null,
    },
    forgetToken: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Admin", adminSchema);
