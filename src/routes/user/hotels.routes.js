const express = require("express");
const {
  getHotelById,
  getHotelByAllIds,
} = require("../../controllers/user/hotels.controller");

const router = express.Router();

router.get("/getHotelsById/:id", getHotelById);
router.post("/getHotelsByAllIds", getHotelByAllIds);
module.exports = router;
