const express = require("express");
const { verifyAdminJWTToken } = require("../../middlewares/auth.middleware");
const { allowedRoles } = require("../../constant");

const {
  validateRequest,
  isAdminHaveAccess,
} = require("../../middlewares/vaildate.middleware");
const {
  getAllHotels,
  getHotelById,
  updateHotel,
  deleteHotel,
  createHotel,
} = require("../../controllers/admin/hotels.controller");
const { uploadImages } = require("../../utils/multerFile");
const {
  hotelCreateValidator,
  hotelUpdateValidator,
  hotelDeleteValidator,
} = require("../../vaildators/hotels.vaildators");

const router = express.Router();

router.post(
  "/createHotel",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  uploadImages,
  hotelCreateValidator(),
  validateRequest,
  createHotel
);

router.get(
  "/allHotels",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getAllHotels
);

router.get(
  "/getHotelByID/:id",
  verifyAdminJWTToken,
  validateRequest,
  getHotelById
);

router.put(
  "/updateHotelById/:id",
  verifyAdminJWTToken,
  uploadImages,
  isAdminHaveAccess(...allowedRoles),
  hotelUpdateValidator(),
  validateRequest,
  updateHotel
);

router.delete(
  "/deleteHotelById/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  hotelDeleteValidator(),
  validateRequest,
  deleteHotel
);

module.exports = router;
