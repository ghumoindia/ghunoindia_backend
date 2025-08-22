const Experience = require("../../../models/experience");
const {
  formatImage,
  formatMultipleImages,
} = require("../../utils/ImageFormter");

const createExperience = async (req, res) => {
  try {
    const { body, files } = req;
    const data = {
      ...body,
      coverImage: files?.coverImage?.[0]
        ? formatImage(files.coverImage[0])
        : undefined,
      slideshowImages: files?.slideshowImages
        ? formatMultipleImages(files.slideshowImages)
        : [],
    };

    if (typeof data.cityIds === "string") {
      data.cityIds = JSON.parse(data.cityIds).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }
    if (typeof data.stateIds === "string") {
      data.stateIds = JSON.parse(data.stateIds).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }

    const experience = new Experience(data);
    await experience.save();

    res
      .status(201)
      .json({ success: true, message: "Experience created", experience });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getAllExperiences = async (req, res) => {
  try {
    const experiences = await Experience.find().populate("stateId", "name");
    res.json({ success: true, message: "Experience list", experiences });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findById(req.params.id).populate(
      "stateId",
      "name"
    );
    if (!experience)
      return res.status(404).json({ message: "Experience not found" });

    res.json({ success: true, message: "Experience fetched", experience });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const updateExperience = async (req, res) => {
  try {
    const { body, files } = req;
    const data = {
      ...body,
      coverImage: files?.coverImage?.[0]
        ? formatImage(files.coverImage[0])
        : undefined,
      slideshowImages: files?.slideshowImages
        ? formatMultipleImages(files.slideshowImages)
        : [],
    };

    if (typeof data.cityIds === "string") {
      data.cityIds = JSON.parse(data.cityIds).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }
    if (typeof data.stateIds === "string") {
      data.stateIds = JSON.parse(data.stateIds).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }

    const experience = await Experience.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!experience)
      return res.status(404).json({ message: "Experience not found" });

    res.json({ success: true, message: "Experience updated", experience });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const deleteExperience = async (req, res) => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);
    if (!experience)
      return res.status(404).json({ message: "Experience not found" });

    res.json({ success: true, message: "Experience deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  createExperience,
  getAllExperiences,
  getExperienceById,
  updateExperience,
  deleteExperience,
};
