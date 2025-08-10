const TravelCalendar = require("../../../models/calender");

// Create or update a single month's calendar entry
const createOrUpdateMonthCalendar = async (req, res) => {
  console.log("Creating/updating month calendar with data:", req.body);
  try {
    const {
      year = new Date().getFullYear(),
      monthNumber,
      month,
      season,
      weather,
      description,
      states,
    } = req.body;

    // Find existing month entry or create new one
    const existingMonth = await TravelCalendar.findOne({
      year: year,
      monthNumber: monthNumber,
    });

    let calendar;

    if (existingMonth) {
      // Update existing month
      existingMonth.month = month;
      existingMonth.season = season;
      existingMonth.weather = weather || existingMonth.weather;
      existingMonth.description = description || existingMonth.description;
      existingMonth.states = states || existingMonth.states;

      calendar = await existingMonth.save();
    } else {
      // Create new month entry
      calendar = new TravelCalendar({
        year,
        monthNumber,
        month,
        season,
        weather,
        description,
        states: states || [],
      });
      await calendar.save();
    }

    // Populate the state references
    const populatedCalendar = await TravelCalendar.findById(calendar._id)
      .populate("states.stateId")
      .exec();

    res.status(201).json({
      success: true,
      message: existingMonth
        ? "Travel calendar month updated successfully"
        : "Travel calendar month created successfully",
      calendar: populatedCalendar,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Calendar entry for this month and year already exists",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all months for a specific year
const getTravelCalendarByYear = async (req, res) => {
  try {
    const { year = new Date().getFullYear() } = req.params;

    const calendars = await TravelCalendar.find({ year: parseInt(year) })
      .populate("states.stateId")
      .sort({ monthNumber: 1 })
      .lean();

    res.status(200).json({
      success: true,
      calendars,
      year: parseInt(year),
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get specific month data
const getMonthCalendar = async (req, res) => {
  try {
    const { year = new Date().getFullYear(), monthNumber } = req.params;

    const calendar = await TravelCalendar.findOne({
      year: parseInt(year),
      monthNumber: parseInt(monthNumber),
    })
      .populate("states.stateId")
      .lean();

    if (!calendar) {
      return res.status(404).json({
        success: false,
        message: "Calendar data not found for this month",
      });
    }

    res.status(200).json({
      success: true,
      calendar,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update specific month
const updateMonthCalendar = async (req, res) => {
  try {
    const { year = new Date().getFullYear(), monthNumber } = req.params;

    const calendar = await TravelCalendar.findOne({
      year: parseInt(year),
      monthNumber: parseInt(monthNumber),
    });

    if (!calendar) {
      return res.status(404).json({
        success: false,
        message: "Calendar month not found",
      });
    }

    // Update fields
    Object.assign(calendar, req.body);
    await calendar.save();

    const populatedCalendar = await TravelCalendar.findById(calendar._id)
      .populate("states.stateId")
      .exec();

    res.status(200).json({
      success: true,
      message: "Calendar month updated successfully",
      calendar: populatedCalendar,
    });
  } catch (error) {
    if (error.name === "VersionError") {
      return res.status(409).json({
        success: false,
        message: "Calendar was modified by another user. Please refresh.",
      });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete specific month
const deleteMonthCalendar = async (req, res) => {
  try {
    const { year = new Date().getFullYear(), monthNumber } = req.params;

    const deletedCalendar = await TravelCalendar.findOneAndDelete({
      year: parseInt(year),
      monthNumber: parseInt(monthNumber),
    });

    if (!deletedCalendar) {
      return res.status(404).json({
        success: false,
        message: "Calendar month not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Calendar month deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add state to specific month
const addStateToMonth = async (req, res) => {
  try {
    const { year = new Date().getFullYear(), monthNumber } = req.params;
    const stateData = req.body;

    const calendar = await TravelCalendar.findOne({
      year: parseInt(year),
      monthNumber: parseInt(monthNumber),
    });

    if (!calendar) {
      return res.status(404).json({
        success: false,
        message: "Calendar month not found",
      });
    }

    calendar.states.push(stateData);
    await calendar.save();

    const populatedCalendar = await TravelCalendar.findById(calendar._id)
      .populate("states.stateId")
      .exec();

    res.status(200).json({
      success: true,
      message: "State added to calendar month successfully",
      calendar: populatedCalendar,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Remove state from specific month
const removeStateFromMonth = async (req, res) => {
  try {
    const {
      year = new Date().getFullYear(),
      monthNumber,
      stateIndex,
    } = req.params;

    const calendar = await TravelCalendar.findOne({
      year: parseInt(year),
      monthNumber: parseInt(monthNumber),
    });

    if (!calendar) {
      return res.status(404).json({
        success: false,
        message: "Calendar month not found",
      });
    }

    if (stateIndex < 0 || stateIndex >= calendar.states.length) {
      return res.status(400).json({
        success: false,
        message: "Invalid state index",
      });
    }

    calendar.states.splice(parseInt(stateIndex), 1);
    await calendar.save();

    const populatedCalendar = await TravelCalendar.findById(calendar._id)
      .populate("states.stateId")
      .exec();

    res.status(200).json({
      success: true,
      message: "State removed from calendar month successfully",
      calendar: populatedCalendar,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createOrUpdateMonthCalendar,
  getTravelCalendarByYear,
  getMonthCalendar,
  updateMonthCalendar,
  deleteMonthCalendar,
  addStateToMonth,
  removeStateFromMonth,
};
