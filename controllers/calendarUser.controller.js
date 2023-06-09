
const {
  createCalendarUserService,
  acceptedJoinCalendarService,
} = require("../services/calendarUser.service");
const calendarUserController = {
  createCalendarUser: async (
    userId,
    calendarId,
    canView,
    canEdit,
    canShare,
    accepted
  ) => {
    try {
      const calendarUser = await createCalendarUserService(
        userId,
        calendarId,
        canView,
        canEdit,
        canShare,
        accepted
      );
      return calendarUser;
    } catch (error) {
      console.log(error);
      return false;
    }
  },
  acceptedJoinCalendar: async (calendarId, accepted) => {
    try {
      const calendar = await acceptedJoinCalendarService(calendarId, accepted);
      return calendar;
    } catch (error) {
      console.log(error);
      return null;
    }
  },
};
module.exports = calendarUserController;
