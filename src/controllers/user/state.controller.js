const state = require("../../../models/state");
const user = require("../../../models/user");

const getAllStates = async (req, res) => {
  try {
    const states = await state
      .find()
      .populate("cityIds", "name")
      .populate("placeIds", "name")
      .populate("foodIds", "name");
    res
      .status(200)
      .json({ success: true, message: "state fetched", data: states });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

const getStateById = async (req, res) => {
  try {
    const { id } = req.params;
    const singleState = await state.findById(id);

    if (!singleState) {
      return res
        .status(404)
        .json({ success: false, message: "State not found" });
    }

    res.status(200).json({ success: true, data: singleState });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Server error", error: error.message });
  }
};

module.exports = {
  getAllStates,
  getStateById,
};
