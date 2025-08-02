const Hotel = require("../../../models/hotels");

const getHotelById = async (req, res) => {
  try {
    const data = await Hotel.findById(req.params.id);
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Hotel not found" });
    }
    res.status(200).json({ success: true, data });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getHotelByAllIds = async (req, res) => {
  try {
    const { ids } = req.body;

    if (!Array.isArray(ids) || ids.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide an array of IDs" });
    }

    const data = await Hotel.find({ _id: { $in: ids } });

    res.status(200).json({
      success: true,
      message: "Hotels fetched successfully",
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
  getHotelById,
  getHotelByAllIds,
};
