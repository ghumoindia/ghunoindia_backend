const wonders = require("../../../models/wonders");

const {
  formatImage,
  formatMultipleImages,
} = require("../../utils/ImageFormter");

const createWonders = async (req, res) => {
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

    if (typeof data.stateId === "string") {
      data.stateId = JSON.parse(data.stateId).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }

    const wonder = await wonders.create(data);
    res
      .status(201)
      .json({ success: true, message: "wonder created successfully", wonder });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create wonder",
      error: err.message,
    });
  }
};

const getAllWonders = async (req, res) => {
  try {
    const result = await wonders.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "wonder fetch successfully",
      wonder: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getWonderById = async (req, res) => {
  try {
    const result = await wonders.findById(req.params.id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Wonder not found" });
    res.json({ success: true, wonder: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const updateWonder = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (req.files || req.file) {
      const { coverImage, slideshowImages } = req.files || {};
      if (coverImage && coverImage[0]) {
        data.coverImage = formatImage(coverImage[0]);
      }
      if (slideshowImages && slideshowImages.length > 0) {
        data.slideshowImages = formatMultipleImages(slideshowImages);
      }
    }
    if (typeof data.placeIds === "string") {
      data.placeIds = JSON.parse(data.placeIds).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }
    if (typeof data.foodIds === "string") {
      data.foodIds = JSON.parse(data.foodIds).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }
    if (typeof data.stateIds === "string") {
      data.stateIds = JSON.parse(data.stateIds).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }
    const result = await wonders.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Wonder not found" });
    res.json({ success: true, wonder: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const deleteWonder = async (req, res) => {
  try {
    const result = await wonders.findByIdAndDelete(req.params.id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "result not found" });
    res.json({ success: true, message: "result deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createWonders,
  getAllWonders,
  getWonderById,
  updateWonder,
  deleteWonder,
};
