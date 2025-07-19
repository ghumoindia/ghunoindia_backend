const express = require("express");
const router = express.Router();
const {
  getPlacesById,
  getPlacesByAllIds,
} = require("../../controllers/user/places.controller");

router.get("/getPlacesById/:id", getPlacesById);
router.post("/getPlacesByAllIds", getPlacesByAllIds);

module.exports = router;
