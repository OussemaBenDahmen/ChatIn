/*const express = require("express");
const socket = require("socket.io");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();

const msgs = [];

require("dotenv").config();
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.json());
app.use(require("./routes/index"));

app.use("/", (req, res) => {
  res.send("hello to the server");
});

const server = app.listen(process.env.PORT, () => {
  console.log("server listening on " + process.env.PORT);
  console.log("http://localhost:" + process.env.PORT);
});

const io = socket(server).listen(3001);

io.on("connection", (socket) => {
  io.emit("log", "Welcome to the app");
  socket.broadcast.emit("LogIn-Notification", "someone has joined");
  socket.on("msg", (data) => {
    console.log(data);
    msgs.push(data);
    console.log(msgs);
    io.emit("message", msgs);
  });

  socket.on("disconnect", () => {
    io.emit("LogIn-Notification", "someone is out");
  });
});
*/
const express = require("express");
const socket = require("socket.io");
const app = express();
const cookieParser = require("cookie-parser");
const LoginRoute = require("./Routes/LoginRoute");
const MsgRoute = require("./Routes/MsgRoute");

const msgs = [];

/****************************************/
require("dotenv").config();

//Connection to the DataBase
const mongoose = require("mongoose");
const MsgModel = require("./Models/MsgModel");
mongoose.connect(
  process.env.MongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Connected to the DataBase");
  }
);
/****************************************/

//Setting Up The server
app.use(cookieParser());
app.use(express.json());

//Access-Controls
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Credentials", true);
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  next();
});
/*********************************/

//Login Middleware
app.use("/ChatIn", LoginRoute);

//Get Messages Middleware
app.use("/ChatIn/Msgs", MsgRoute);

const server = app.listen(process.env.PORT, () => {
  console.log("server listening on " + process.env.PORT);
  console.log("http://localhost:" + process.env.PORT);
});

const io = socket(server);

io.on("connection", (socket) => {
  socket.on("Join", (socket) => {
    socket.broadcast.emit("log", "Someone Joined");
  });
  socket.on;

  socket.on("disconnect", () => {
    io.emit("LogIn-Notification", "someone is out");
  });
});
