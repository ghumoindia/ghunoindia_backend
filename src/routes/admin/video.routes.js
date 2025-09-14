const express = require("express");
const router = express.Router();

const {
  getHeroVideo,
  uploadHeroVideo,
  deleteVideoById,
} = require("../../controllers/admin/video.controller");
const uploadVideo = require("../../utils/videoMulter");
const { verifyAdminJWTToken } = require("../../middlewares/auth.middleware");
const {
  isAdminHaveAccess,
  validateRequest,
} = require("../../middlewares/vaildate.middleware");
const { allowedRoles } = require("../../constant");

router.post(
  "/uploadVideo",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  uploadVideo,
  uploadHeroVideo
);
router.get(
  "/getVideo",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getHeroVideo
);
router.post(
  "/deleteVideoById/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  deleteVideoById
);

module.exports = router;
