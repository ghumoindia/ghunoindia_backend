const express = require("express");
const {
  getAllWonders,
  getWonderById,
} = require("../../controllers/user/wonders.controller");

const router = express.Router();

router.get("/allWonders", getAllWonders);
router.get("/getWondersByID/:id", getWonderById);

module.exports = router;
