const TravelCalendar = require("../../../models/calender");
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

module.exports = {
  getMonthCalendar,
};
