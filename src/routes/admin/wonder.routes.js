const express = require("express");
const { verifyAdminJWTToken } = require("../../middlewares/auth.middleware");
const {
  isAdminHaveAccess,
  validateRequest,
} = require("../../middlewares/vaildate.middleware");
const { allowedRoles } = require("../../constant");
const { uploadImages } = require("../../utils/multerFile");
const {
  createWonders,
  updateWonder,
  deleteWonder,
  getAllWonders,
  getWonderById,
} = require("../../controllers/admin/wonders.controller");

const router = express.Router();

router.post(
  "/createWonder",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  uploadImages,
  validateRequest,
  createWonders
);
router.get(
  "/allWonders",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getAllWonders
);
router.get(
  "/getWondersByID/:id",
  verifyAdminJWTToken,
  validateRequest,
  getWonderById
);

router.put(
  "/updateWonder/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  uploadImages,
  validateRequest,
  updateWonder
);

router.delete(
  "/deleteWonder/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  deleteWonder
);

module.exports = router;
