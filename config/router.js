const userRouter = require("../routes/user.router");
const eventRouter = require("../routes/event.router");
const calendarRouter = require("../routes/calendar.router");
const routerConfig = (app) => {
  app.use("/user", userRouter);
  app.use("/event", eventRouter);
  app.use("/calendar", calendarRouter);
};
module.exports = routerConfig;
