const express = require("express");
const {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
} = require("../../controllers/admin/destination.controller");
const {
  validateRequest,
  isAdminHaveAccess,
} = require("../../middlewares/vaildate.middleware");
const { uploadImages } = require("../../utils/multerFile");
const { verifyAdminJWTToken } = require("../../middlewares/auth.middleware");
const { allowedRoles } = require("../../constant");
const {
  destinationCreateValidator,
  destinationUpdateValidator,
  destinationDeleteValidator,
} = require("../../vaildators/destination.vaildators");

const router = express.Router();

router.post(
  "/createDestination",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  uploadImages,
  destinationCreateValidator(),
  validateRequest,
  createDestination
);

router.get(
  "/allDestinations",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getAllDestinations
);

router.get(
  "/getDestinationByID/:id",
  verifyAdminJWTToken,
  validateRequest,
  getDestinationById
);

router.put(
  "/updateDestinationById/:id",
  verifyAdminJWTToken,
  uploadImages,
  isAdminHaveAccess(...allowedRoles),
  destinationUpdateValidator(),
  validateRequest,
  updateDestination
);

router.delete(
  "/deleteDestinationById/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  destinationDeleteValidator(),
  validateRequest,
  deleteDestination
);

module.exports = router;
