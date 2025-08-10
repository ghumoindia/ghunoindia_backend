const express = require("express");
const {
  createOrUpdateMonthCalendar,
  getTravelCalendarByYear,
  getMonthCalendar,
  updateMonthCalendar,
  deleteMonthCalendar,
  addStateToMonth,
  removeStateFromMonth,
} = require("../../controllers/admin/calender.controller");

const {
  validateRequest,
  isAdminHaveAccess,
} = require("../../middlewares/vaildate.middleware");

const { verifyAdminJWTToken } = require("../../middlewares/auth.middleware");
const { allowedRoles } = require("../../constant");

// Validators
const {
  travelCalendarUpdateValidator,
  travelCalendarDeleteValidator,
  travelCalendarGetByIdValidator,
  travelCalendarCreateValidator,
} = require("../../vaildators/travelCalender.vaildators");

const router = express.Router();

// Create
router.post(
  "/month",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  //   travelCalendarCreateValidator(),
  validateRequest,
  createOrUpdateMonthCalendar
);

router.get(
  "/year/:year",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getTravelCalendarByYear
);

router.get(
  "/month/:year/:monthNumber",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getMonthCalendar
);

router.put(
  "/month/:year/:monthNumber",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  updateMonthCalendar
);

// Delete
router.delete(
  "/month/:year/:monthNumber",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  //   travelCalendarDeleteValidator(),
  validateRequest,
  deleteMonthCalendar
);

router.post(
  "/month/:year/:monthNumber/state",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  addStateToMonth
);

router.delete(
  "/month/:year/:monthNumber/state/:stateIndex",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  removeStateFromMonth
);
module.exports = router;
