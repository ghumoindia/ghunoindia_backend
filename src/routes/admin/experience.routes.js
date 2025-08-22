const express = require("express");
const { verifyAdminJWTToken } = require("../../middlewares/auth.middleware");
const {
  isAdminHaveAccess,
  validateRequest,
} = require("../../middlewares/vaildate.middleware");
const { uploadImages } = require("../../utils/multerFile");
const {
  createExperience,
  getAllExperiences,
  updateExperience,
  deleteExperience,
} = require("../../controllers/admin/experience.controller");
const { allowedRoles } = require("../../constant");

const {
  experienceCreateValidator,
  experienceUpdateValidator,
  experienceDeleteValidator,
} = require("../../vaildators/experience.vaildators");
const router = express.Router();

router.post(
  "/createExperience",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  uploadImages,
  experienceCreateValidator(),
  validateRequest,
  createExperience
);

router.get(
  "/allExperiences",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getAllExperiences
);

router.get(
  "/getExperienceByID/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  validateRequest,
  getAllExperiences
);

router.put(
  "/updateExperienceById/:id",
  verifyAdminJWTToken,
  uploadImages,
  isAdminHaveAccess(...allowedRoles),
  experienceUpdateValidator(),
  validateRequest,
  updateExperience
);

router.delete(
  "/deleteExperienceById/:id",
  verifyAdminJWTToken,
  isAdminHaveAccess(...allowedRoles),
  experienceDeleteValidator(),
  validateRequest,
  deleteExperience
);

module.exports = router;
