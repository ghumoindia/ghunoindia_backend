const express = require("express");
const router = express.Router();

const { getHeroVideo } = require("../../controllers/admin/video.controller");

router.get("/getVideo", getHeroVideo);

module.exports = router;
