const express = require("express");
const router = express.Router();

const { body } = require("express-validator");
const {
  stateUpdateValidator,
  stateDeleteValidator,
  stateCreateValidator,
} = require("../../vaildators/common.vaildators");
const {
  createState,
  getAllStates,
  updateState,
  deleteState,
  getStateById,
} = require("../../controllers/admin/state.controller");
const {
  validateRequest,
  isAdminHaveAccess,
} = require("../../middlewares/vaildate.middleware");
const { verifyAdminJWTToken } = require("../../middlewares/auth.middleware");
const { uploadImages } = require("../../utils/multerFile");

// Only super-admin & content-manager can perform these actions
const allowedRoles = ["super-admin", "content-manager"];

router.post(
  "/createState",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  uploadImages,
  stateCreateValidator(),
  validateRequest,
  createState
);

router.get(
  "/allState",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getAllStates
);

router.get(
  "/getStateByID/:id",
  verifyAdminJWTToken,
  validateRequest,
  getStateById
);

router.put(
  "/updateStateById/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  stateUpdateValidator(),
  validateRequest,
  updateState
);

router.delete(
  "/deleteStateById/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  stateDeleteValidator(),
  validateRequest,
  deleteState
);

module.exports = router;
