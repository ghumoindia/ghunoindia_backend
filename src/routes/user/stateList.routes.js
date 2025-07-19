const express = require("express");
const {
  getAllStates,
  getStateById,
} = require("../../controllers/user/state.controller");

const router = express.Router();
router.get("/allState", getAllStates);
router.get("/singleState/:id", getStateById);

module.exports = router;
