const HeroVideo = require("../../../models/heroVideo");

const uploadHeroVideo = async (req, res) => {
  try {
    console.log("req->", req.body, req.file);
    const { title } = req.body;

    if (!req.file) {
      return res
        .status(400)
        .json({ success: false, message: "No video file uploaded" });
    }
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }

    const videoUrl = `/uploads/${req.file.filename}`;
    const newVideo = new HeroVideo({ title, videoUrl });

    await newVideo.save();

    res.json({ success: true, video: newVideo });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

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

const deleteVideoById = async (req, res) => {
  try {
    const result = await HeroVideo.findByIdAndDelete(req.params.id);
    if (!result) {
      res.json({
        success: false,
        message: "Video not found",
      });
    }

    res.json({ success: true, message: "video delete successfully" });
  } catch (error) {
    res.json({
      success: false,
      message: "Failed to delete video",
      error: err.message,
    });
  }
};

module.exports = {
  uploadHeroVideo,
  getHeroVideo,
  deleteVideoById,
};
