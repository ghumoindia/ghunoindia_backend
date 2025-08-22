const express = require("express");
const {
  getAllExperiences,
  getExperienceById,
} = require("../../controllers/user/experience.controller");
const router = express.Router();

router.get("/getAllExperiences", getAllExperiences);
router.get("/getExperienceByID/:id", getExperienceById);

module.exports = router;
