const Activity = require("../../../models/activity");
const {
  formatImage,
  formatMultipleImages,
} = require("../../utils/ImageFormter");

const createActivity = async (req, res) => {
  try {
    const { body, files } = req;

    const activityData = {
      ...body,
      coverImage: files?.coverImage?.[0]
        ? formatImage(files.coverImage[0])
        : undefined,
      slideshowImages: files?.slideshowImages
        ? formatMultipleImages(files.slideshowImages)
        : [],
    };

    const activity = new Activity(activityData);
    await activity.save();

    res
      .status(201)
      .json({ success: true, message: "Activity created", activity });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to create activity",
      error: err.message,
    });
  }
};

const getAllActivities = async (req, res) => {
  try {
    const activities = await Activity.find().populate("stateId", "name");
    res.json({ success: true, message: "Activity list", activities });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch activities",
      error: err.message,
    });
  }
};

const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).populate(
      "stateId",
      "name"
    );
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    res.json({ success: true, message: "Activity fetched", activity });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch activity",
      error: err.message,
    });
  }
};

const updateActivity = async (req, res) => {
  try {
    const { body, files } = req;
    const data = { ...body };

    if (files?.coverImage?.[0]) {
      data.coverImage = formatImage(files.coverImage[0]);
    }

    if (files?.slideshowImages?.length > 0) {
      data.slideshowImages = formatMultipleImages(files.slideshowImages);
    }

    const activity = await Activity.findByIdAndUpdate(req.params.id, data, {
      new: true,
    });

    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    res.json({ success: true, message: "Activity updated", activity });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update activity",
      error: err.message,
    });
  }
};

const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);
    if (!activity)
      return res.status(404).json({ message: "Activity not found" });

    res.json({ success: true, message: "Activity deleted" });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete activity",
      error: err.message,
    });
  }
};

module.exports = {
  createActivity,
  getAllActivities,
  getActivityById,
  updateActivity,
  deleteActivity,
};
