const State = require("../models/State");

// Create a new state
const createState = async (req, res) => {
  try {
    const state = new State(req.body);
    await state.save();
    res.status(201).json({ message: "State created", state });
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
    res.status(200).json(states);
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
    res.status(200).json(state);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch state", error: err.message });
  }
};

// Update state
const updateState = async (req, res) => {
  try {
    const state = await State.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!state) return res.status(404).json({ message: "State not found" });
    res.status(200).json({ message: "State updated", state });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update state", error: err.message });
  }
};

// Delete state
const deleteState = async (req, res) => {
  try {
    const state = await State.findByIdAndDelete(req.params.id);
    if (!state) return res.status(404).json({ message: "State not found" });
    res.status(200).json({ message: "State deleted" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete state", error: err.message });
  }
};

module.exports = {
  createState,
  getAllStates,
  getStateById,
  updateState,
  deleteState,
};
