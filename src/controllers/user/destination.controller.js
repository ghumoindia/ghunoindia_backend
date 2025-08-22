const Destination = require("../../../models/destination");

const getAllDestinations = async (req, res) => {
  try {
    const destinations = await Destination.find()
      .populate("stateIds", "name")
      .populate("cityIds", "name");

    res.json({
      success: true,
      message: "Destination list",
      data: destinations,
    });
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
      return res
        .status(404)
        .json({ success: true, message: "Destination not found" });

    res.json({
      success: true,
      message: "Fetched successfully",
      data: destination,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch destination",
      error: err.message,
    });
  }
};

module.exports = {
  getAllDestinations,
  getDestinationById,
};
