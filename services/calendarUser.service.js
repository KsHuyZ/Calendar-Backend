const calendarUserModel = require("../models/calendarUser.model");

const calendarUserServices = {
  createCalendarUserService: async (
    userId,
    calendarId,
    canView,
    canEdit,
    canShare,
    accepted
  ) => {
    const calendarUser = calendarUserModel({
      userId,
      calendarId,
      canView,
      canEdit,
      canShare,
      accepted,
    });
    await calendarUser.save();
    return calendarUser;
  },
  acceptedJoinCalendarService: async (calendarId, accepted) => {
    const calendar = await calendarUserModel.findOneAndUpdate(
      { calendarId },
      {
        accepted,
      }
    );
    return calendar;
  },
};

module.exports = calendarUserServices;
