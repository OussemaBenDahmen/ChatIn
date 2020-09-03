import React, { useState, useEffect, useRef } from "react";
import SideBar from "./SideBar";
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

const socket = socketIo.connect("http://localhost:5000");

export const IndividualChat = () => {
  const User = useSelector((state) => state.User);
  const AllUsers = useSelector((state) => state.AllUsers);
  const dispatch = useDispatch();
  const [Message, setMessage] = useState("");
  const [AllMessages, setAllMessages] = useState([]);
  const [Typing, setTyping] = useState();

  const initialValue = AllUsers.filter((el) => el._id !== User._id)[0];
  console.log({ ...initialValue }._id);

  const [recieverId, setrecieverId] = useState({ ...initialValue }._id);
  const [GroupeID, setGroupeID] = useState("");
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  let FriendName = { ...AllUsers.filter((el) => el._id === recieverId)[0] }
    .UserName;
  const GetConversation = (id) => {
    setrecieverId(id);
  };
  const GetGroupConversation = (Groupeid) => {
    setGroupeID(Groupeid);
    console.log(Groupeid);
  };
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
  console.log(FilteredMessages);
  const SendMessage = (e) => {
    if (GroupeID === "") {
      SendMessageSocket({ message: Message, recieverId: recieverId });
      setMessage("");
    } else {
      SendGroupeMessage({ message: Message, groupeId: GroupeID });
      setMessage("");
    }
  };
  useEffect(() => {
    dispatch(GetAllUsers());

    socket.emit("join", "hello");
    socket.on("messages", (data) => {
      setAllMessages(data);
      setTyping(false);
      scrollToBottom();
    });
    socket.on("TypingNow", (data) => setTyping(data.Typing));
    dispatch(GetLoggedUser());
  }, [dispatch]);
  console.log(AllMessages);
  return (
    <div className="IndividualChatPage">
      <header className="UserAccountInfoSection">
        <div className="UsersInfo">
          <img
            className="ProfileImage"
            src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
            alt="UserPic"
          />
          <h2>{User.UserName}</h2>
        </div>
        <Button
          variant="contained"
          className="DisconnectBtn ThirdBackground"
          onClick={() => {
            LogOutApiRequest();
          }}
        >
          Disconnect
        </Button>
      </header>
      <main className="MainSection">
        <SideBar
          setMessage={setMessage}
          GetConversation={GetConversation}
          GetGroupConversation={GetGroupConversation}
        />
        <div className="ChatSection">
          <div className="FriendInfo">
            <img
              className="ProfileImage"
              src="https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png"
              alt="FriendsPic"
            />
            <h3>{FriendName}</h3>
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
                      <p className="MessageDate">
                        {el.date.toString().substring(0, 10) +
                          " " +
                          el.date.toString().substring(11, 16)}
                      </p>
                    </div>
                    <div
                      key={i}
                      className={`MessageBubble  ${
                        el.senderId._id !== User._id
                          ? "PrimaryBackground"
                          : "ThirdBackground"
                      }`}
                    >
                      <p className="MessageTxt">{el.value}</p>
                    </div>
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
                    <div
                      key={i}
                      className={`MessageBubble  ${
                        el.senderId._id !== User._id
                          ? "PrimaryBackground"
                          : "ThirdBackground"
                      }`}
                    >
                      <p className="MessageTxt">{el.value}</p>
                    </div>
                    <div className="messageInfo">
                      <p className="UserName">{el.senderId.UserName}</p>
                      <p className="MessageDate">
                        {el.date.toString().substring(0, 10) +
                          " " +
                          el.date.toString().substring(11, 16)}
                      </p>
                    </div>
                  </div>
                )
              )
            ) : (
              <div className="messageSection">
                <p>say hello</p>
              </div>
            )}
            {Typing ? (
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
                TypingSocket({ Typing: true });
                setMessage(e.target.value);
              }}
            />
            <Button
              variant="contained"
              type="submit"
              className="ThirdBackground SubmitBtn"
              onClick={(e) => {
                e.preventDefault();
                if (Message !== "") {
                  SendMessage();
                  setTyping(false);
                } else {
                  alert("type something");
                }
              }}
            >
              Send
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default IndividualChat;
