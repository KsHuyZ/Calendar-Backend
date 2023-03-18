const express = require("express");
const logger = require("morgan");
require("dotenv/config");
require("./config/firebaseConfig.js");
const routerConfig = require("./config/router");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const http = require("http");
const socket = require("./config/socket");
const app = express();

const PORT = process.env.PORT || 4000;

// view engine setup

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
dbConnect();



