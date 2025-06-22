const express = require("express");
const { verifyAdminJWTToken } = require("../../middlewares/auth.middleware");
const { allowedRoles } = require("../../constant");
const { uploadImages } = require("../../utils/multerFile");
const {
  placeCreateValidator,
  placeUpdateValidator,
  placeDeleteValidator,
} = require("../../vaildators/places.vaildators");
const {
  validateRequest,
  isAdminHaveAccess,
} = require("../../middlewares/vaildate.middleware");
const {
  createPlace,
  getAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
} = require("../../controllers/admin/places.controller");
const router = express.Router();

router.post(
  "/createPlace",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  uploadImages,
  placeCreateValidator(),
  validateRequest,
  createPlace
);
router.get(
  "/allPlaces",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getAllPlaces
);
router.get(
  "/getPlaceByID/:id",
  verifyAdminJWTToken,
  validateRequest,
  getPlaceById
);
router.put(
  "/updatePlaceById/:id",
  verifyAdminJWTToken,
  uploadImages,
  isAdminHaveAccess(...allowedRoles),
  placeUpdateValidator(),
  validateRequest,
  updatePlace
);
router.delete(
  "/deletePlaceById/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  placeDeleteValidator(),
  validateRequest,
  deletePlace
);

module.exports = router;
