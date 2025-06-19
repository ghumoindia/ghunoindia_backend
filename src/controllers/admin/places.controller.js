const Places = require("../../../models/places");

const createPlace = async (req, res) => {
  try {
    const { body, files } = req;

    const data = {
      ...body,
    };

    if (files || req.file) {
      const { coverImage, slideshowImages } = files || {};
      if (coverImage && coverImage[0]) {
        data.coverImage = coverImage[0].path;
      }
      if (slideshowImages && slideshowImages.length > 0) {
        data.slideshowImages = slideshowImages.map((img) => img.path);
      }
    }

    if (typeof data.cityIds === "string")
      data.cityIds = JSON.parse(data.cityIds);
    if (typeof data.stateId === "string")
      data.stateId = JSON.parse(data.stateId);

    const place = await Places.create(data);
    res.status(201).json({ message: "Place created successfully", place });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create place", error: err.message });
  }
};

const getAllPlaces = async (req, res) => {
  try {
    const places = await Places.find();
    res.status(200).json(cities);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch cities", error: err.message });
  }
};

const getPlaceById = async (req, res) => {
  try {
    const place = await Places.findById(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.status(200).json(place);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch place", error: err.message });
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

    const place = await Places.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.status(200).json({ message: "Place updated successfully", place });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update place", error: err.message });
  }
};
const deletePlace = async (req, res) => {
  try {
    const place = await Places.findByIdAndDelete(req.params.id);
    if (!place) return res.status(404).json({ message: "Place not found" });
    res.status(200).json({ message: "Place deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete place", error: err.message });
  }
};

module.exports = {
  createPlace,
  getAllPlaces,
  getPlaceById,
  updatePlace,
  deletePlace,
};
