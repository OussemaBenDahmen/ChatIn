const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const LoginRoute = require("./Routes/LoginRoute");
const MsgRoute = require("./Routes/MsgRoute");
const UserRoute = require("./Routes/UserRoute");
const GroupeRoute = require("./Routes/GroupeRoute");

const socket = require("socket.io");
const { get, post } = require("./Controllers/MsgController");
const { GrpPost, GrpGet } = require("./Controllers/GrpMsgController");
const UserModel = require("./Models/UsersModel");
const GroupeModel = require("./Models/GroupeModel");

let msgs = [];

//Setting Up The server
require("dotenv").config();
app.use(cookieParser());
app.use(express.json());

/******************Mongoose Config**********************/

//Connection to the DataBase
const mongoose = require("mongoose");

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
/****************Middlewares*****************/

//Login Middleware
app.use("/ChatIn", LoginRoute);

//Users Middleware
app.use("/users", UserRoute);

//Messages Middleware
app.use("/ChatIn/Msgs", MsgRoute);

//Groupes Middleware
app.use("/Groupes", GroupeRoute);

const server = app.listen(process.env.PORT, () => {
  console.log("server listening on " + process.env.PORT);
  console.log("http://localhost:" + process.env.PORT);
});

/*************Socket.io*********************/
//Socket Configuration
const io = socket(server);

io.on("connection", (socket) => {
  get("req", msgs).then((data) => (msgs = data));

  io.emit("messages", msgs);

  io.emit("LogIn-Notification", "Someone Joined");

  socket.on("SendMessage", async (data) => {
    const SocketCookie = socket.handshake.headers["cookie"]
      .split(" ")
      .filter((el) => el.includes("token"))[0];

    const token = SocketCookie.substring(6, SocketCookie.length).match(
      /(\w+\.?-*)+/gi
    );

    const User = jwt.verify(token[0].toString(), process.env.SECRET_KEY);
    const myMessage = data.message;
    let Reciever = await UserModel.findById({ _id: data.recieverId });
    if (Reciever === null) {
      Reciever = await GroupeModel.findById({ _id: data.recieverId });
    }

    const mydata = {
      User: User,
      myMessage,
      recieverId: Reciever,
    };
    post(mydata, (data) => {
      console.log(data);
      msgs.push(data);
      socket.broadcast.emit("messages", msgs);
    });

    io.emit("messages", msgs);
  });
  socket.on("GroupeMessage", (data) => {
    const SocketCookie = socket.handshake.headers["cookie"]
      .split(" ")
      .filter((el) => el.includes("token"))[0];

    const token = SocketCookie.substring(6, SocketCookie.length).match(
      /(\w+\.?-*)+/gi
    );

    const User = jwt.verify(token[0].toString(), process.env.SECRET_KEY);
    const myMessage = data.message;
    GroupeModel.find({ _id: data.groupeId }).then(async (data) => {
      const mydata = {
        User: User,
        myMessage,
        groupeId: data[0],
      };
      await post(mydata, (data) => {
        console.log(data);
        msgs.push(data);
        socket.broadcast.emit("messages", msgs);
      });

      io.emit("messages", msgs);
    });
  });

  socket.on("Typing", (data) => {
    socket.broadcast.emit("TypingNow", { Typing: data.Typing });
  });

  socket.on("disconnect", () => {
    io.emit("LogIn-Notification", "someone is out");
  });
});
