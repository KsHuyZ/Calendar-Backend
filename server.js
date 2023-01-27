const express = require("express");
const logger = require("morgan");
require("dotenv/config");
require("./config/firebaseConfig.js");
const routerConfig = require("./config/router");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const userRouter = require("./routes/userRouter");
const app = express();

const DB = process.env.DB;
const PORT = process.env.PORT || 4000;

// view engine setup

const authorizationJWT = async (req, res, next) => {
  console.log({ authorization: req.header.authorization });
  next();
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
app.options("*", cors());
const server = http.createServer(app);
routerConfig(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["POST", "GET", "DELETE", "PUT"],
  },
});

io.on("connection", (socket) => {
  console.log(`${socket.id} connect`);
  socket.on("join-schedule", (room) => {
    socket.join(room);
    console.log(`User ${socket.id} join to ${room}`);
  });
  socket.on("disconnect", () => {
    console.log(`User ${socket.id} is disconnect`);
  });
});

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
