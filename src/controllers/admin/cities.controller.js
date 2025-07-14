const City = require("../../../models/city");
const {
  formatImage,
  formatMultipleImages,
} = require("../../utils/ImageFormter");

const createCity = async (req, res) => {
  try {
    const { body, files } = req;
    const cityData = {
      ...body,
      coverImage: files?.coverImage?.[0]
        ? formatImage(files.coverImage[0])
        : undefined,
      slideshowImages: files?.slideshowImages
        ? formatMultipleImages(files.slideshowImages)
        : [],
    };

    if (typeof cityData.placeIds === "string") {
      cityData.placeIds = JSON.parse(cityData.placeIds).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }
    if (typeof cityData.foodIds === "string") {
      cityData.foodIds = JSON.parse(cityData.foodIds).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }
    if (typeof cityData.stateIds === "string") {
      cityData.stateIds = JSON.parse(cityData.stateIds).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }

    const city = new City(cityData);
    await city.save();

    res.status(201).json({ success: true, message: "City created", city });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create city",
      error: err.message,
    });
  }
};

const getAllCities = async (req, res) => {
  try {
    const cities = await City.find();
    res.json({ success: true, message: "city list ", cities });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch cities",
      error: err.message,
    });
  }
};

const getCityById = async (req, res) => {
  try {
    const city = await City.findById(req.params.id);
    if (!city) return res.status(404).json({ message: "City not found" });
    res.json({ success: true, message: "get successfully", city });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch city",
      error: err.message,
    });
  }
};

const updateCity = async (req, res) => {
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

    const city = await City.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!city) return res.status(404).json({ message: "City not found" });

    res.json({ success: true, message: "City updated", city });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update city",
      error: err.message,
    });
  }
};

const deleteCity = async (req, res) => {
  try {
    const city = await City.findByIdAndDelete(req.params.id);
    if (!city) return res.status(404).json({ message: "City not found" });
    res.json({ success: true, message: "City deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete city",
      error: err.message,
    });
  }
};

module.exports = {
  createCity,
  getAllCities,
  getCityById,
  updateCity,
  deleteCity,
};
