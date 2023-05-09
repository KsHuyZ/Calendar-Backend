const userRouter = require("../routes/user.router");
const eventRouter = require("../routes/event.router");
const calendarRouter = require("../routes/calendar.router");
const notificationTypeRouter = require("../routes/notificationType.router");
const invitationRouter = require("../routes/invitation.router");
const eventAttenteeRouter = require("../routes/eventAttentee.router");
const columnTaskRouter = require("../routes/columnTask.router");
const authRouter = require("../routes/auth.router");
const routerConfig = (app) => {
  app.use("/user", userRouter);
  app.use("/event", eventRouter);
  app.use("/calendar", calendarRouter);
  app.use("/notification-type", notificationTypeRouter);
  app.use("/invitation", invitationRouter);
  app.use("/event-attentee", eventAttenteeRouter);
  app.use("/column-task", columnTaskRouter);
  app.use("/auth", authRouter);
};

module.exports = routerConfig;
