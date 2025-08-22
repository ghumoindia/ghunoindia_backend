const Experience = require("../../../models/experience");

const getAllExperiences = async (req, res) => {
  const experience = await Experience.find();
  if (!experience || experience.length === 0) {
    return res
      .status(404)
      .json({ success: false, message: "No experiences found" });
  }
  res.status(200).json({
    success: true,
    message: "Experiences fetched successfully",
    data: experience,
  });
};

const getExperienceById = async (req, res) => {
  try {
    const data = await Experience.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllExperiences,
  getExperienceById,
};
