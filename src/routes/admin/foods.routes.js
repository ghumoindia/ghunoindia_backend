const express = require("express");
const { verifyAdminJWTToken } = require("../../middlewares/auth.middleware");
const { allowedRoles } = require("../../constant");

const {
  validateRequest,
  isAdminHaveAccess,
} = require("../../middlewares/vaildate.middleware");
const {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
} = require("../../controllers/admin/foods.controller");
const { uploadImages } = require("../../utils/multerFile");
const {
  foodCreateValidator,
  foodUpdateValidator,
  foodDeleteValidator,
} = require("../../vaildators/foods.vaildators");

const router = express.Router();

router.post(
  "/createFood",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  uploadImages,
  foodCreateValidator(),
  validateRequest,
  createFood
);
router.get(
  "/allFoods",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getAllFoods
);

router.get(
  "/getFoodByID/:id",
  verifyAdminJWTToken,
  validateRequest,
  getFoodById
);
router.put(
  "/updateFoodById/:id",
  verifyAdminJWTToken,
  uploadImages,
  isAdminHaveAccess(...allowedRoles),
  foodUpdateValidator(),
  validateRequest,
  updateFood
);
router.delete(
  "/deleteFoodById/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  foodDeleteValidator(),
  validateRequest,
  deleteFood
);

module.exports = router;
