const express = require("express");
const {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
} = require("../../controllers/admin/activities.controller");

const {
  activityCreateValidator,
  activityUpdateValidator,
  activityDeleteValidator,
} = require("../../vaildators/activities.vailators");
const { verifyAdminJWTToken } = require("../../middlewares/auth.middleware");
const { allowedRoles } = require("../../constant");
const { uploadImages } = require("../../utils/multerFile");
const {
  validateRequest,
  isAdminHaveAccess,
} = require("../../middlewares/vaildate.middleware");

const router = express.Router();

router.post(
  "/createActivity",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  uploadImages,
  activityCreateValidator(),
  validateRequest,
  createActivity
);

router.get(
  "/allActivities",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getAllActivities
);

router.get(
  "/getActivityByID/:id",
  verifyAdminJWTToken,
  validateRequest,
  getActivityById
);

router.put(
  "/updateActivityById/:id",
  verifyAdminJWTToken,
  uploadImages,
  isAdminHaveAccess(...allowedRoles),
  activityUpdateValidator(),
  validateRequest,
  updateActivity
);

router.delete(
  "/deleteActivityById/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  activityDeleteValidator(),
  validateRequest,
  deleteActivity
);

module.exports = router;
