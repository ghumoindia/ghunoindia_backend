const Foods = require("../../../models/foods");
const {
  formatImage,
  formatMultipleImages,
} = require("../../utils/ImageFormter");

const createFood = async (req, res) => {
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

    const food = await Foods.create(data);
    res
      .status(201)
      .json({ success: true, message: "Food created successfully", food });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create food",
      error: err.message,
    });
  }
};

const getAllFoods = async (req, res) => {
  try {
    const foods = await Foods.find();
    res
      .status(200)
      .json({ success: true, message: "foods get successfully", foods });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch foods",
      error: err.message,
    });
  }
};

const getFoodById = async (req, res) => {
  try {
    const food = await Foods.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res
      .status(200)
      .json({ success: true, food, message: "Food fetched successfully" });
  } catch (err) {
    res.status(500).json({
      success: true,
      message: "Failed to fetch food",
      error: err.message,
    });
  }
};
const updateFood = async (req, res) => {
  try {
    const data = {
      ...req.body,
      coverImage: req.file ? req.file.path : undefined,
      slideshowImages: req.files ? req.files.map((file) => file.path) : [],
    };

    const food = await Foods.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!food) return res.status(404).json({ message: "Food not found" });
    res
      .status(200)
      .json({ success: true, message: "Food updated successfully", food });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update food",
      error: err.message,
    });
  }
};
const deleteFood = async (req, res) => {
  try {
    const food = await Foods.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res
      .status(200)
      .json({ success: true, message: "Food deleted successfully" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete food",
      error: err.message,
    });
  }
};
module.exports = {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
};
