const calendarModel = require("../models/calendar.model");
const calendarUserModel = require("../models/calendarUser.model");
const Event = require("../models/event.model");
const calendarController = {
  createCalendar: async (req, res) => {
    const { calendarName, description, imagePreview, ownerId } = req.body;
    try {
      const photoCalendar = req.file.path;
      const calendar = new calendarModel({
        calendarName,
        description,
        photoCalendar,
        ownerId,
      });
      const calendarUser = new calendarUserModel({
        userId: ownerId,
        calendarId: calendar._id,
        canView: true,
        canEdit: true,
        canShare: true,
      });
      await calendar.save();
      await calendarUser.save();
      return res.status(200).json({ success: true, calendar });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false });
    }
  },
  getEventbyCalendarId: async (req, res) => {
    const { id, year } = req.params;
    const currentYear = Number(year);
    try {
      const events = await Event.find({
        calendarId: id,
        // match: {
        start: {
          $gte: `${currentYear}-01-01`,
          $lte: `${currentYear}-12-31`,
        },
        // },
      }).populate("createdBy location");
      return res.status(200).json({ success: true, events });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false, events: [] });
    }
  },
};
module.exports = calendarController;
