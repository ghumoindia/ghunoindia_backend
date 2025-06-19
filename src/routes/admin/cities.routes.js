const express = require("express");
const {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
} = require("../../controllers/admin/cities.controller");
const {
  validateRequest,
  isAdminHaveAccess,
} = require("../../middlewares/vaildate.middleware");
const { uploadImages } = require("../../utils/multerFile");
const { verifyAdminJWTToken } = require("../../middlewares/auth.middleware");
const { allowedRoles } = require("../../constant");
const {
  cityUpdateValidator,
  cityDeleteValidator,
  cityCreateValidator,
} = require("../../vaildators/cities.vaildators");
const router = express.Router();

router.post(
  "/createCity",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  uploadImages,
  cityCreateValidator(),
  validateRequest,
  createCity
);
router.get(
  "/allCities",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getAllCities
);

router.get(
  "/getCityByID/:id",
  verifyAdminJWTToken,
  validateRequest,
  getCityById
);
router.put(
  "/updateCityById/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  cityUpdateValidator(),
  validateRequest,
  updateCity
);
router.delete(
  "/deleteCityById/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  cityDeleteValidator(),
  validateRequest,
  deleteCity
);

module.exports = router;
