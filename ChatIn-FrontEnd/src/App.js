import React, { useEffect } from "react";
import socketIo from "socket.io-client";
import "./App.css";
import IndividualChat from "./Components/MainPage/IndividualChat";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SignIn from "./Components/LogIn/Login";
import SignUp from "./Components/SignUp/SignUp";
//import { GetLoggedUser } from "./ApiRequests/GetLoggedUser";
import { useDispatch } from "react-redux";

function App() {
  const socket = socketIo.connect("http://localhost:5000");
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit("Log");
    socket.on("LogIn-Notification", (data) => console.log(data));
  }, [socket, dispatch]);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
          <Route path="/SignUp">
            <SignUp />
          </Route>
          <Route path="/IndvidualChat">
            <IndividualChat />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
