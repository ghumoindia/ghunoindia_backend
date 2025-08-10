const express = require("express");
const {
  getMonthCalendar,
} = require("../../controllers/user/calender.controller");
const router = express.Router();

router.get("/month/:year/:monthNumber", getMonthCalendar);

module.exports = router;
