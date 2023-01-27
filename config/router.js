const userRouter = require("../routes/userRouter");
const eventRouter = require("../routes/eventRouter");
const scheduleRouter = require("../routes/scheduleRouter");
const routerConfig = (app) => {
  app.use("/user", userRouter);
  app.use("/event", eventRouter);
  app.use("/schedule", scheduleRouter);
};
module.exports = routerConfig;
