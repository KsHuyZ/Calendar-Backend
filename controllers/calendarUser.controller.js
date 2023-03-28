const calendarUserModel = require("../models/calendarUser.model");

const calendarUserController = {
  createCalendarUser: async (
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
    try {
      await calendarUser.save();
      return calendarUser;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  acceptedJoinCalendar: async (calendarId, accepted) => {
    try {
      const calendar = await calendarUserModel.findOneAndUpdate(
        { calendarId },
        {
          accepted,
        }
      );
      return calendar;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
module.exports = calendarUserController;
