const userRouter = require("../routes/userRouter");
const eventRouter = require("../routes/eventRouter");
const scheduleRouter = require("../routes/scheduleRouter");
const notifyRouter = require("../routes/notifyRouter");
const routerConfig = (app) => {
  app.use("/user", userRouter);
  app.use("/event", eventRouter);
  app.use("/schedule", scheduleRouter);
  app.use("/notify", notifyRouter);
};
module.exports = routerConfig;
