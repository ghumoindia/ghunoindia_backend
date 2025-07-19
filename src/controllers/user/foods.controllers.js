const foods = require("../../../models/foods");

const getFoodById = async (req, res) => {
  try {
    const data = await foods.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getFoodByAllIds = async (req, res) => {
  try {
    const { ids } = req.body; // expecting ids as array in request body

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide an array of IDs" });
    }

    const data = await foods.find({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: "Foods fetched successfully",
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
  getFoodById,
  getFoodByAllIds,
};
