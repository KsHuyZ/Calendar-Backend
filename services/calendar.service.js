const calendarModel = require("../models/calendar.model");
const calendarUserModel = require("../models/calendarUser.model");
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
  getMyCalendar: async (id, calendarId) => {
    const calendar = await calendarModel.findOne({
      _id: calendarId,
      ownerId: id,
    });
    if (calendar) {
      return true;
    } else {
      const calendarExist = await calendarUserModel.findOne({
        userId: id,
        calendarId,
      });
      if (calendarExist) {
        return true;
      }
      return false;
    }
  },
};

module.exports = calendarServices;
