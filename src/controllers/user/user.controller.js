const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const { sendMail } = require("../lib/nodemailer.lib");

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
    });

    res
      .status(201)
      .json({ sucess: true, message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || user.isBlocked)
      return res
        .status(401)
        .json({ message: "Invalid credentials or blocked account" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    const refresh = jwt.sign({ id: user._id }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    user.refreshToken = refresh;
    user.lastLogin = new Date();
    await user.save();

    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };

    res
      .status(200)
      .json({ success: true, userData, token, refreshToken: refresh });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.headers.authorization;

    let token;
    if (refreshToken && refreshToken.startsWith("Bearer ")) {
      token = refreshToken.split(" ")[1];
    } else if (req.cookies && req.cookies.refreshToken) {
      token = req.cookies.refreshToken;
    } else {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    const payload = jwt.verify(token, JWT_REFRESH_SECRET);
    const user = await User.findById(payload.id);

    if (!user || user.refreshToken !== token)
      return res.status(403).json({ message: "Invalid token" });

    const newToken = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    const userData = {
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      phone: user.phone,
    };

    res
      .status(200)
      .json({ userData, token: newToken, refreshToken: user.refreshToken });
  } catch (err) {
    res
      .status(403)
      .json({ message: "Token invalid or expired", error: err.message });
  }
};

exports.logoutUser = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) return res.status(400).json({ message: "Missing user ID" });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.refreshToken = null;
    user.lastLogin = new Date();
    await user.save();

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = crypto.randomBytes(32).toString("hex");
    user.forgetToken = token;
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;

    await sendMail({
      to: user.email,
      subject: "Password Reset Request",
      html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
    });

    res
      .status(200)
      .json({ success: true, message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error processing request",
      error: err.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const user = await User.findOne({ forgetToken: token });
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.forgetToken = null;
    await user.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not reset password", error: err.message });
  }
};
