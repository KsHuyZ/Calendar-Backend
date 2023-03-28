const userRouter = require("../routes/user.router");
const eventRouter = require("../routes/event.router");
const calendarRouter = require("../routes/calendar.router");
const notificationTypeRouter = require("../routes/notificationType.router");
const invitationRouter = require("../routes/invitation.router")
const routerConfig = (app) => {
  app.use("/user", userRouter);
  app.use("/event", eventRouter);
  app.use("/calendar", calendarRouter);
  app.use("/notification-type", notificationTypeRouter);
  app.use("/invitation",invitationRouter)
};
module.exports = routerConfig;
