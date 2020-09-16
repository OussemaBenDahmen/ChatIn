const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");
const os = require("os");

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
app.use(express.static("Public"));
const myIpAdress = os.networkInterfaces().wlp2s0[0].address; //getting the Pc's Ip +address

let AllowedDomains = ["localhost", `${myIpAdress}`];
/*************************************/
// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const Upload = multer({ storage: storage });
/******************Mongoose Config**********************/

//Connection to the DataBase

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

const whitelist = AllowedDomains.map((domain) => `http://${domain}:3000`);

app.use(
  cors({
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);
// app.options("*", cors());

/****************Middlewares*****************/

//Login Middleware
app.use("/ChatIn", LoginRoute);

//Users Middleware
app.use("/users", UserRoute);

//Messages Middleware
app.use("/ChatIn/Msgs", MsgRoute);

//Groupes Middleware
app.use("/Groupes", GroupeRoute);

//Upload Image MiddleWare
app.put("/UploadImage", Upload.single("Picture"), (req, res) => {
  const myFile = req.file;

  const myToken = req.cookies.token;
  let decoded = jwt.verify(myToken, process.env.SECRET_KEY);
  UserModel.findByIdAndUpdate(
    { _id: decoded._id },
    { $set: { picture: myFile.originalname } }
  ).then(res.send("done"));
});

const server = app.listen(process.env.PORT, ["*", ...AllowedDomains], () => {
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
        msgs.push(data);
        socket.broadcast.emit("messages", msgs);
      });

      io.emit("messages", msgs);
    });
  });

  socket.on("Typing", (data) => {
    socket.broadcast.emit("TypingNow", { Typing: data.Typing });
  });

  socket.on("Update", (data) => {
    io.emit("Reload", { reload: true });
  });

  socket.on("disconnect", () => {
    io.emit("LogIn-Notification", "someone is out");
  });
});
