const Activity = require("../../../models/activity");

const getActivityById = async (req, res) => {
  try {
    const data = await Activity.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Activity not found" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getActivityByAllIds = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide an array of IDs" });
    }

    const data = await Activity.find({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: "Activities fetched successfully",
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

module.exports = {
  getActivityById,
  getActivityByAllIds,
};
