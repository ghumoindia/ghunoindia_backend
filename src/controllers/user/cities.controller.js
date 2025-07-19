const city = require("../../../models/city");

const getCityById = async (req, res) => {
  try {
    const data = await city.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "City not found" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getCityByAllIds = async (req, res) => {
  try {
    const { ids } = req.body; // expecting ids as array in request body
    console.log(ids);

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide an array of IDs" });
    }

    const data = await city.find({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: "Cities fetched successfully",
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
  getCityById,
  getCityByAllIds,
};
