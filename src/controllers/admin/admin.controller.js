const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { transporter, sendMail } = require("../../lib/nodemailer.lib");
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const crypto = require("crypto");
const Admin = require("../../../models/admin");
const { sendInBlueMailId } = require("../../../constant/constants");

const registerAdmin = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    console.log("Registering admin:", { name, email, phone, role });
    const existing = await Admin.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await Admin.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });

    res.status(201).json({ message: "Admin registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });

    if (!admin || admin.isBlocked)
      return res
        .status(401)
        .json({ message: "Invalid credentials or blocked account" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    const refresh = jwt.sign({ id: admin._id }, JWT_REFRESH_SECRET, {
      expiresIn: "7d",
    });

    admin.refreshToken = refresh;
    admin.lastLogin = new Date();
    await admin.save();
    res.cookie("accessToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    res.cookie("refreshToken", refresh, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({ id: admin.id, token, refreshToken: refresh });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

const refreshToken = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken)
      return res.status(401).json({ message: "Refresh token missing" });

    const payload = jwt.verify(refreshToken, JWT_REFRESH_SECRET);
    const admin = await Admin.findById(payload.id);

    if (!admin || admin.refreshToken !== refreshToken)
      return res.status(403).json({ message: "Invalid token" });

    const newToken = jwt.sign({ id: admin._id, role: admin.role }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token: newToken });
  } catch (err) {
    res
      .status(403)
      .json({ message: "Token invalid or expired", error: err.message });
  }
};

const logoutAdmin = async (req, res) => {
  try {
    const { adminId } = req.body;

    if (!adminId) return res.status(400).json({ message: "Missing admin ID" });

    const admin = await Admin.findById(adminId);
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    admin.refreshToken = null;
    admin.lastLogin = new Date();
    await admin.save();

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    res.status(500).json({ message: "Logout failed", error: err.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const token = crypto.randomBytes(32).toString("hex");
    admin.forgetToken = token;
    await admin.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${token}`;
    console.log(
      "Reset link:",
      resetLink,
      "for email:",
      email,
      sendInBlueMailId
    );
    // Send email
    await sendMail({
      to: admin.email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset. Click <a href="${resetLink}">here</a> to reset your password. If you didn't request this, please ignore.</p>`,
    });

    res.status(200).json({ message: "Reset link sent to email" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error processing request", error: err.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const admin = await Admin.findOne({ forgetToken: token });
    if (!admin)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashed = await bcrypt.hash(newPassword, 10);
    admin.password = hashed;
    admin.forgetToken = null;
    await admin.save();

    res.status(200).json({ message: "Password reset successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Could not reset password", error: err.message });
  }
};

module.exports = {
  registerAdmin,
  loginAdmin,
  refreshToken,
  logoutAdmin,
  forgotPassword,
  resetPassword,
};
