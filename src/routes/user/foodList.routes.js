const express = require("express");
const {
  getFoodById,
  getFoodByAllIds,
} = require("../../controllers/user/foods.controllers");
const router = express.Router();

router.get("/getFoodByID/:id", getFoodById);
router.post("/getFoodByAllIds", getFoodByAllIds);

module.exports = router;
