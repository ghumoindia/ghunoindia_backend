const HeroVideo = require("../../../models/heroVideo");

const getHeroVideo = async (req, res) => {
  try {
    console.log("latest video");
    const latestVideo = await HeroVideo.find();
    console.log("latest video->", latestVideo);

    res.json({ success: true, video: latestVideo });
  } catch (error) {
    console.log("error", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getHeroVideo,
};
