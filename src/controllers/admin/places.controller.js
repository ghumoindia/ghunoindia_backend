const Places = require("../../../models/places");
const {
  formatImage,
  formatMultipleImages,
} = require("../../utils/ImageFormter");

const createPlace = async (req, res) => {
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

    const place = await Places.create(data);
    res
      .status(201)
      .json({ success: true, message: "Place created successfully", place });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create place",
      error: err.message,
    });
  }
};

const getAllPlaces = async (req, res) => {
  try {
    const places = await Places.find();
    res
      .status(200)
      .json({ success: true, message: "Places fetched successfully", places });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cities",
      error: err.message,
    });
  }
};

const getPlaceById = async (req, res) => {
  try {
    const place = await Places.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    res
      .status(200)
      .json({ success: true, message: "Place fetched successfully", place });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch place",
      error: err.message,
    });
  }
};

const updatePlace = async (req, res) => {
  try {
    const data = {
      ...req.body,
    };

    if (req.files || req.file) {
      const { coverImage, slideshowImages } = req.files || {};
      if (coverImage && coverImage[0]) {
        data.coverImage = coverImage[0].path;
      }
      if (slideshowImages && slideshowImages.length > 0) {
        data.slideshowImages = slideshowImages.map((img) => img.path);
      }
    }
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

    const place = await Places.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!place)
      return res
        .status(404)
        .json({ success: false, message: "Place not found" });
    res
      .status(200)
      .json({ success: true, message: "Place updated successfully", place });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update place",
      error: err.message,
    });
  }
};
const deletePlace = async (req, res) => {
  try {
    const place = await Places.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    res
      .status(200)
      .json({ success: true, message: "Place deleted successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete place",
      error: err.message,
    });
  }
};

module.exports = {
  createPlace,
  getAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
};
