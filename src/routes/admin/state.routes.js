const express = require("express");
const router = express.Router();
const stateController = require("../controllers/stateController");

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
} = require("../../controllers/admin/state.controller");
const {
  validateRequest,
  isAdminHaveAccess,
} = require("../../middlewares/vaildate.middleware");
const { verifyAdminJWTToken } = require("../../middlewares/auth.middleware");

// Only super-admin & content-manager can perform these actions
const allowedRoles = ["super-admin", "content-manager"];

router.post(
  "/admin/v1/createState",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  stateCreateValidator(),
  validateRequest,
  createState
);

router.get(
  "/admin/v1/allState",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getAllStates
);

router.get("/admin/v1/getStateByID/:id", stateController.getStateById);

router.put(
  "/admin/v1/updateStateById/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  stateUpdateValidator(),
  validateRequest,
  updateState
);

router.delete(
  "/admin/v1/deleteStateById/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  stateDeleteValidator(),
  validateRequest,
  deleteState
);

module.exports = router;
