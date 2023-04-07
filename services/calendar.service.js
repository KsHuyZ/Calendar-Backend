const calendarModel = require("../models/calendar.model");

const calendarServices = {
  createCalendarServices: async ({
    calendarName,
    description,
    photoCalendar,
    ownerId,
  }) => {
    const calendar = new calendarModel({
      calendarName,
      description,
      photoCalendar,
      ownerId,
    });
    await calendar.save();
    return calendar;
  },
};

module.exports = calendarServices