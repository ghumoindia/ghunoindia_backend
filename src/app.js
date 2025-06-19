const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();
const adminAuthRoutes = require("./routes/admin/admin.routes");
const stateRoutes = require("./routes/admin/state.routes");
// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// adminRoutes
app.use("/admin/v1/auth", adminAuthRoutes);
app.use("/admin/v1/state", stateRoutes);

module.exports = app;
