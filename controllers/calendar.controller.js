const { createCalendarServices } = require("../services/calendar.service");
const calendarController = {
  createCalendar: async (req, res) => {
    const { calendarName, description, imagePreview, ownerId } = req.body;
    try {
      const photoCalendar = req.file.path;

      const calendar = await createCalendarServices({
        calendarName,
        description,
        photoCalendar,
        ownerId,
      });

      return res.status(200).json({ success: true, calendar });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ success: false });
    }
  },
 
};
module.exports = calendarController;
