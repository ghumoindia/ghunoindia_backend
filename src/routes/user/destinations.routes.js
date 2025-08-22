const express = require("express");
const {
  getAllDestinations,
} = require("../../controllers/user/destination.controller");

const router = express.Router();

router.get("/allDestinations", getAllDestinations);
router.get("getDestinationByID/:id", getAllDestinations);

module.exports = router;
