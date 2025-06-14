const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// adminRoutes
//  app.use("/admin/v1/auth");

module.exports = app;
