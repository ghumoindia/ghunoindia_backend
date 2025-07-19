const express = require("express");
const {
  getCityById,
  getCityByAllIds,
} = require("../../controllers/user/cities.controller");
const router = express.Router();

router.get("/getCitiesById/:id", getCityById);
router.post("/getCitiesByAllIds", getCityByAllIds);

module.exports = router;
