import React, { useState, useEffect, useRef } from "react";

import Button from "@material-ui/core/Button";
import socketIo from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { LogOutApiRequest } from "../../ApiRequests/LogOut";
import {
  SendMessageSocket,
  SendGroupeMessage,
  TypingSocket,
} from "../../Sockets/MessageSockets";
import { GetLoggedUser } from "../../ApiRequests/GetLoggedUser";
import { GetAllUsers } from "../../ApiRequests/GetAllUsers";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { Link } from "react-router-dom";
import { ServerURI } from "../../ApiRequests/Config";
import ErrorDialogue from "../ErrorDialogue/ErrorDialogue";
import SwipeableTemporaryDrawer from "./SideDrawer";
import SendIcon from "@material-ui/icons/Send";

const ImagePlaceHolder =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

const socket = socketIo.connect(ServerURI);

export const IndividualChat = () => {
  const User = useSelector((state) => state.User);
  const AllUsers = useSelector((state) => state.AllUsers);
  const AllGroupes = useSelector((state) => state.AllGroupes);
  const dispatch = useDispatch();
  const [Message, setMessage] = useState("");
  const [AllMessages, setAllMessages] = useState([]);
  const [Typing, setTyping] = useState();
  const [SelectedUser, setSelectedUser] = useState({});
  const [recieverId, setrecieverId] = useState("");
  const [GroupeID, setGroupeID] = useState("");
  const messagesEndRef = useRef(null);
  const [ErrorOpen, setErrorOpen] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("Fill the form please");
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  let GrpName = { ...AllGroupes.filter((el) => el._id === GroupeID)[0] }
    .GroupeName;
  const GetConversation = (id) => {
    setrecieverId(id);
    setTimeout(scrollToBottom, 0);
    const Selected = { ...AllUsers.filter((el) => el._id === id)[0] };
    setSelectedUser(Selected);
  };
  const GetGroupConversation = (Groupeid) => {
    setGroupeID(Groupeid);
    setTimeout(scrollToBottom, 0);
  };

  // eslint-disable-next-line
  const FilteredMessages = AllMessages.filter((el) => {
    if (GroupeID !== "" && el.groupeId) {
      return el.groupeId._id === GroupeID;
    } else if (GroupeID === "" && el.recieverId) {
      return (
        (el.senderId._id === recieverId && el.recieverId._id === User._id) ||
        (el.recieverId._id === recieverId && el.senderId._id === User._id)
      );
    }
  });

  const SendMessage = (e) => {
    if (GroupeID === "") {
      SendMessageSocket({ message: Message, recieverId: recieverId });
      setMessage("");
    } else {
      SendGroupeMessage({ message: Message, groupeId: GroupeID });
      setMessage("");
    }
  };

  const handleErrorOpen = () => {
    setErrorOpen(true);
  };
  const handleErrorClose = () => {
    setErrorOpen(false);
  };
  useEffect(() => {
    dispatch(GetLoggedUser());
    dispatch(GetAllUsers());
    socket.on("TypingNow", (data) => setTyping(data.Typing));
    socket.emit("join", "hello");
    socket.on("Reload", (data) => {
      window.location.reload(true);
    });
    socket.on("messages", (data) => {
      setAllMessages(data);
      setTyping(false);
      scrollToBottom();
    });
  }, []);

  return (
    <div className="IndividualChatPage">
      <header className="UserAccountInfoSection">
        <div className="UsersInfo">
          <img
            className="ProfileImage"
            src={
              User.picture !== undefined
                ? `${ServerURI}/${User.picture}`
                : ImagePlaceHolder
            }
            alt="UserPic"
          />
          <h2>{User.UserName}</h2>
          <Link to="/EditProfile">
            <button className="EditProfileBtn">
              <EditOutlinedIcon />
            </button>
          </Link>
        </div>
        <Button
          variant="contained"
          className="DisconnectBtn"
          onClick={() => {
            LogOutApiRequest();
          }}
        >
          Disconnect
        </Button>
      </header>
      <main className="MainSection">
        <SwipeableTemporaryDrawer
          ImagePlaceHolder={ImagePlaceHolder}
          setMessage={setMessage}
          GetConversation={GetConversation}
          GetGroupConversation={GetGroupConversation}
        />

        <div className="ChatSection">
          <div className="FriendInfo">
            <img
              className="ProfileImage"
              src={
                SelectedUser.picture === undefined
                  ? ImagePlaceHolder
                  : `${ServerURI}/${SelectedUser.picture}`
              }
              alt="FriendsPic"
            />
            <h3>{SelectedUser.UserName || GrpName}</h3>
          </div>
          <div className="MessageSection">
            {FilteredMessages.length !== 0 ? (
              FilteredMessages.map((el, i) =>
                el.senderId._id === User._id ? (
                  <div
                    key={el._id}
                    className={`MessageElement  ${
                      el.senderId._id !== User._id
                        ? "MessageLeft"
                        : "MessageRight"
                    }`}
                  >
                    <div className="messageInfo">
                      <p className="UserName">{el.senderId.UserName}</p>
                    </div>
                    <div
                      key={i}
                      className={`MessageBubble  ${
                        el.senderId._id !== User._id
                          ? "PrimaryBackground"
                          : "SecondairyBackground"
                      }`}
                    >
                      <p className="MessageTxt">{el.value}</p>
                    </div>
                    <p className="MessageDate">
                      {el.date.toString().substring(0, 10) +
                        " " +
                        el.date.toString().substring(11, 16)}
                    </p>
                  </div>
                ) : (
                  <div
                    key={el._id}
                    className={`MessageElement  ${
                      el.senderId._id !== User._id
                        ? "MessageLeft"
                        : "MessageRight"
                    }`}
                  >
                    <div className="messageInfo">
                      <p className="UserName">{el.senderId.UserName}</p>
                    </div>
                    <div
                      key={i}
                      className={`MessageBubble  ${
                        el.senderId._id !== User._id
                          ? "PrimaryBackground"
                          : "SecondairyBackground"
                      }`}
                    >
                      <p className="MessageTxt">{el.value}</p>
                    </div>
                    <p className="MessageDate">
                      {el.date.toString().substring(0, 10) +
                        " " +
                        el.date.toString().substring(11, 16)}
                    </p>
                  </div>
                )
              )
            ) : (
              <div className="messageSection">
                <p>say hello</p>
              </div>
            )}
            {Typing && Message === "" ? (
              <p className="MessageLeft TypingMessage">Typing ... </p>
            ) : null}
            <div ref={messagesEndRef} />
          </div>
          <form className="input-form">
            <input
              type="text"
              placeholder="Type your message..."
              className="MessageInput"
              value={Message}
              onKeyUp={(e) =>
                setTimeout(() => {
                  TypingSocket({ Typing: false });
                }, 5000)
              }
              onChange={(e) => {
                setTyping(false);
                TypingSocket({ Typing: true });
                setMessage(e.target.value);
              }}
            />
            <Button
              variant="contained"
              type="submit"
              className="SubmitBtn"
              onClick={(e) => {
                e.preventDefault();
                if (Message !== "") {
                  if (recieverId === "" && GroupeID === "") {
                    setErrorMessage("Choose a user or a groupe first");
                    handleErrorOpen();
                    setMessage("");
                  } else if (recieverId !== "" || GroupeID !== "") {
                    SendMessage();
                  }
                  setTyping(false);
                } else {
                  setErrorMessage("Type something before sending");
                  handleErrorOpen();
                }
              }}
            >
              <SendIcon />
            </Button>
          </form>
        </div>

        <ErrorDialogue
          ErrorOpen={ErrorOpen}
          handleClose={handleErrorClose}
          Message={ErrorMessage}
        />
      </main>
    </div>
  );
};

export default IndividualChat;
