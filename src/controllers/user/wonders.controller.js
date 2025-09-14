const wonders = require("../../../models/wonders");

const getAllWonders = async (req, res) => {
  try {
    const result = await wonders.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "wonder fetch successfully",
      wonder: result,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

const getWonderById = async (req, res) => {
  try {
    const result = await wonders.findById(req.params.id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: "Wonder not found" });
    res.json({ success: true, wonder: result });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getAllWonders,
  getWonderById,
};
