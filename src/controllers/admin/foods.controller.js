const Foods = require("../../../models/foods");

const createFood = async (req, res) => {
  try {
    const data = {
      ...req.body,
      coverImage: req.file ? req.file.path : undefined,
      slideshowImages: req.files ? req.files.map((file) => file.path) : [],
    };

    const food = await Foods.create(data);
    res.status(201).json({ message: "Food created successfully", food });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create food", error: err.message });
  }
};

const getAllFoods = async (req, res) => {
  try {
    const foods = await Foods.find();
    res.status(200).json(foods);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch foods", error: err.message });
  }
};

const getFoodById = async (req, res) => {
  try {
    const food = await Foods.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.status(200).json(food);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch food", error: err.message });
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
    res.status(200).json({ message: "Food updated successfully", food });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update food", error: err.message });
  }
};
const deleteFood = async (req, res) => {
  try {
    const food = await Foods.findByIdAndDelete(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.status(200).json({ message: "Food deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete food", error: err.message });
  }
};
module.exports = {
  createFood,
  getAllFoods,
  getFoodById,
  updateFood,
  deleteFood,
};
