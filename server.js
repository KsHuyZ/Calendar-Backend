const express = require("express");
const logger = require("morgan");
require("dotenv/config");
require("./config/firebaseConfig.js");
const routerConfig = require("./config/router");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const socket = require("./config/socket");
const userRouter = require("./routes/userRouter");
const app = express();

const DB = process.env.DB;
const PORT = process.env.PORT || 4000;

// view engine setup

const authorizationJWT = async (req, res, next) => {
  console.log({ authorization: req.header.authorization });
  next();
};

// app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.options("*", cors());
const server = http.createServer(app);
routerConfig(app);
socket(server);

server.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
mongoose.set("strictQuery", false);
// mongoose.set("strictPopulate", false);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    console.log("Connect to mongodb");
  });
