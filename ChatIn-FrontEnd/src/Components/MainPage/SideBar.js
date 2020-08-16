import React from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "./style.css";

export const SideBar = () => {
  return (
    <Router>
      <div className="SideBar">
        <div className="GroupeSection">
          <h2>Groupes</h2>
          <Link to="/GroupeName">
            {" "}
            <div className="SideBarLink">mefmhef</div>
          </Link>
          <Link to="/GroupeName">
            {" "}
            <div className="SideBarLink">mefmhef</div>
          </Link>
          <Link to="/GroupeName">
            {" "}
            <div className="SideBarLink">mefmhef</div>
          </Link>
        </div>
        <div className="OnlineUsersSection">
          <h2>Online Users</h2>
          <Link to="/UserName">
            <div className="SideBarLink">
              <img src="" alt="UserPic" />
              <h5 className="UserName">mfkbzemnzm</h5>
            </div>
          </Link>
          <Link to="/UserName">
            <div className="SideBarLink">
              <img src="" alt="UserPic" />
              <h5 className="UserName">mfkbzemnzm</h5>
            </div>
          </Link>
          <Link to="/UserName">
            <div className="SideBarLink">
              <img src="" alt="UserPic" />
              <h5 className="UserName">mfkbzemnzm</h5>
            </div>
          </Link>
          <Link to="/UserName">
            <div className="SideBarLink">
              <img src="" alt="UserPic" />
              <h5 className="UserName">mfkbzemnzm</h5>
            </div>
          </Link>
        </div>
      </div>
    </Router>
  );
};

export default SideBar;
