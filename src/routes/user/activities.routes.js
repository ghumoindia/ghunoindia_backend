const express = require("express");
const {
  getActivityById,
  getActivityByAllIds,
} = require("../../controllers/user/activities.controller");
const router = express.Router();

router.get("/getActivitiesById/:id", getActivityById);
router.post("/getActivitiesByAllIds", getActivityByAllIds);
module.exports = router;
