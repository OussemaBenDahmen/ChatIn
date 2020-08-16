import React, { useState, useEffect } from "react";
import SideBar from "./SideBar";
import Button from "@material-ui/core/Button";
import Axios from "axios";
import socketIo from "socket.io-client";
import { ServerURI } from "../../Actions/types";
const socket = socketIo.connect("http://localhost:5000");

const JsonUrl = "http://localhost:4000";
export const IndividualChat = () => {
  const [Message, setMessage] = useState("");
  const [AllMessages, setAllMessages] = useState([]);
  const SendMessage = (e) => {};
  useEffect(() => {}, [socket]);

  return (
    <div className="IndividualChatPage">
      <header className="UserAccountInfoSection">
        <div className="UsersInfo">
          <img src="#" alt="UserPic" />
          <h2>Name</h2>
        </div>
        <Button
          variant="contained"
          className="DisconnectBtn ThirdBackground"
          onClick={() => {
            window.location.assign("/");
          }}
        >
          Disconnect
        </Button>
      </header>
      <main className="MainSection">
        <SideBar />
        <div className="ChatSection">
          <div className="FriendInfo">
            <img src="" alt="FriendsPic" />
            <h3>Friend Name</h3>
          </div>
          <div className="MessageSection">
            {AllMessages.length !== 0 ? (
              AllMessages.map((el, i) => (
                <div
                  key={i}
                  className={` MessageBubble PrimaryBackground ${
                    i % 2 === 0 ? "MessageLeft" : "MessageRight"
                  }`}
                >
                  <p className="MessageTxt">{el}</p>
                </div>
              ))
            ) : (
              <div className="messageSection">
                <p>say hello</p>
              </div>
            )}
          </div>
          <form className="input-form">
            <input
              type="text"
              placeholder="Type your message..."
              className="MessageInput"
              value={Message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              variant="contained"
              type="submit"
              className="ThirdBackground SubmitBtn"
              onClick={(e) => {
                e.preventDefault();
                if (Message !== "") {
                  SendMessage();
                  socket.emit("msg", Message);
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
