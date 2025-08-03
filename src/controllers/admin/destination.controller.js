const Destination = require("../../../models/destination");
const {
  formatImage,
  formatMultipleImages,
} = require("../../utils/ImageFormter");

const createDestination = async (req, res) => {
  try {
    const { body, files } = req;
    const destinationData = {
      ...body,
      coverImage: files?.coverImage?.[0]
        ? formatImage(files.coverImage[0])
        : undefined,
      slideshowImages: files?.slideshowImages
        ? formatMultipleImages(files.slideshowImages)
        : [],
    };

    if (typeof destinationData.cityIds === "string") {
      destinationData.cityIds = JSON.parse(destinationData.cityIds).map((id) =>
        id.replace(/['"]+/g, "")
      );
    }
    if (typeof destinationData.stateIds === "string") {
      destinationData.stateIds = JSON.parse(destinationData.stateIds).map(
        (id) => id.replace(/['"]+/g, "")
      );
    }

    const destination = new Destination(destinationData);
    await destination.save();

    res
      .status(201)
      .json({ success: true, message: "Destination created", destination });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create destination",
      error: err.message,
    });
  }
};

const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find()
      .populate("stateIds", "name")
      .populate("cityIds", "name");

    res.json({ success: true, message: "Destination list", destinations });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch destinations",
      error: err.message,
    });
  }
};

const getDestinationById = async (req, res) => {
  try {
    const destination = await Destination.findById(req.params.id)
      .populate("stateIds", "name")
      .populate("cityIds", "name");

    if (!destination)
      return res.status(404).json({ message: "Destination not found" });

    res.json({ success: true, message: "Fetched successfully", destination });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch destination",
      error: err.message,
    });
  }
};

const updateDestination = async (req, res) => {
  try {
    const data = { ...req.body };

    if (req.files || req.file) {
      const { coverImage, slideshowImages } = req.files || {};
      if (coverImage && coverImage[0]) {
        data.coverImage = formatImage(coverImage[0]);
      }
      if (slideshowImages && slideshowImages.length > 0) {
        data.slideshowImages = formatMultipleImages(slideshowImages);
      }
    }

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

    const destination = await Destination.findByIdAndUpdate(
      req.params.id,
      data,
      {
        new: true,
      }
    );
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });

    res.json({ success: true, message: "Destination updated", destination });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update destination",
      error: err.message,
    });
  }
};

const deleteDestination = async (req, res) => {
  try {
    const destination = await Destination.findByIdAndDelete(req.params.id);
    if (!destination)
      return res.status(404).json({ message: "Destination not found" });
    res.json({ success: true, message: "Destination deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete destination",
      error: err.message,
    });
  }
};

module.exports = {
  createDestination,
  getAllDestinations,
  getDestinationById,
  updateDestination,
  deleteDestination,
};
