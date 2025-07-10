const State = require("../../../models/state");
const {
  formatImage,
  formatMultipleImages,
} = require("../../utils/ImageFormter");

// Create a new state
const createState = async (req, res) => {
  try {
    const { body, files, file } = req;
    console.log("req.body", body, "req.files", files, file);
    const stateData = {
      ...body,
      coverImage: files?.coverImage?.[0]
        ? formatImage(files.coverImage[0])
        : undefined,
      slideshowImages: files?.slideshowImages
        ? formatMultipleImages(files.slideshowImages)
        : [],
    };

    // if (typeof stateData.cityIds === "string") {
    //   stateData.cityIds = JSON.parse(stateData.cityIds);
    // }
    // if (typeof stateData.placeIds === "string") {
    //   stateData.placeIds = JSON.parse(stateData.placeIds);
    // }
    // if (typeof stateData.foodIds === "string") {
    //   stateData.foodIds = JSON.parse(stateData.foodIds);
    // }

    const state = new State(stateData);
    await state.save();

    res.status(200).json({ success: true, message: "State created", state });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create state", error: err.message });
  }
};

// Get all states
const getAllStates = async (req, res) => {
  try {
    const states = await State.find()

      .populate("cityIds", "name")
      .populate("placeIds", "name")
      .populate("foodIds", "name");

    res.status(200).json({ success: true, states });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch states", error: err.message });
  }
};

// Get a single state by ID
const getStateById = async (req, res) => {
  try {
    const state = await State.findById(req.params.id)
      .populate("cityIds", "name")
      .populate("placeIds", "name")
      .populate("foodIds", "name");
    if (!state) return res.status(404).json({ message: "State not found" });
    res.status(200).json({ success: true, state });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch state", error: err.message });
  }
};

// Update state
const updateState = async (req, res) => {
  try {
    const updateData = { ...req.body };

    console.log("req.body", req.body);

    if (req.files?.coverImage?.[0]) {
      updateData.coverImage = formatImage(req.files.coverImage[0]);
    }

    if (req.files?.slideshowImages) {
      updateData.slideshowImages = formatMultipleImages(
        req.files.slideshowImages
      );
    }

    // if (typeof updateData.cityIds === "string")
    //   updateData.cityIds = JSON.parse(updateData.cityIds);
    // if (typeof updateData.placeIds === "string")
    //   updateData.placeIds = JSON.parse(updateData.placeIds);
    // if (typeof updateData.foodIds === "string")
    //   updateData.foodIds = JSON.parse(updateData.foodIds);

    const state = await State.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!state) return res.status(404).json({ message: "State not found" });

    res.status(200).json({ success: true, message: "State updated", state });
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "Update failed", error: err.message });
  }
};

// Delete state
const deleteState = async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) return res.status(404).json({ message: "State not found" });
    res.status(200).json({ success: true, message: "State deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete state",
      error: err.message,
    });
  }
};

module.exports = {
  createState,
  getAllStates,
  getStateById,
  updateState,
  deleteState,
};
