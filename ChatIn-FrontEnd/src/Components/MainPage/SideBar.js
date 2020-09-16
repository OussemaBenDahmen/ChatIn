import React, { useState } from "react";
import { Link, BrowserRouter as Router } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { GetAllUsers } from "../../ApiRequests/GetAllUsers";
import { GetLoggedUser } from "../../ApiRequests/GetLoggedUser";
import AddGroupeModal from "./AddGroupeModal";
import EditGroupeModal from "./EditGroupeModal";
import { GetAllGroupes, DeleteGroupe } from "../../ApiRequests/GroupeRequests";
import DeleteOutlineRoundedIcon from "@material-ui/icons/DeleteOutlineRounded";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import { UpdateSocket } from "../../Sockets/UpdateSockets";
import { ServerURI } from "../../ApiRequests/Config";
import AddIcon from "@material-ui/icons/Add";
import ErrorDialogue from "../ErrorDialogue/ErrorDialogue";

export const SideBar = (props) => {
  const dispatch = useDispatch();
  const AllUsers = useSelector((state) => state.AllUsers);
  const AllGroupes = useSelector((state) => state.AllGroupes);
  /************************/
  const [open, setOpen] = useState(false);
  const [EditOpen, setEditOpen] = useState(false);
  const [Groupe, setGroupe] = useState({});
  /***********Add Modal Controls**************/
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  /**************Edit Modal Controls*************/
  const handleEditOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };
  /*************************/

  /**************** */
  const [ErrorOpen, setErrorOpen] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("Fill the form please");

  const handleErrorOpen = () => {
    setErrorOpen(true);
  };
  const handleErrorClose = () => {
    setErrorOpen(false);
  };
  /**************** */

  const User = useSelector((state) => state.User);
  useEffect(() => {
    dispatch(GetAllUsers());
    dispatch(GetLoggedUser());
    dispatch(GetAllGroupes());
  }, [dispatch]);
  return (
    <Router>
      <div className="SideBar">
        <div className="GroupeSection">
          <h2>Groupes</h2>
          <div className="SideBarLink AddGroupeBtn" onClick={handleOpen}>
            <AddIcon fontSize="large" />
            <div className="GroupeName">Create a groupe</div>
          </div>
          <AddGroupeModal
            open={open}
            handleClose={handleClose}
            handleErrorOpen={handleErrorOpen}
            setErrorMessage={setErrorMessage}
          />
          <EditGroupeModal
            key={Groupe._id}
            EditOpen={EditOpen}
            handleEditClose={handleEditClose}
            GroupeId={Groupe._id}
            GroupeName={Groupe.GroupeName}
            GroupeUsers={Groupe.Users}
          />

          {AllGroupes.map((el, i) => (
            <>
              <Link
                className="SideBarLink GroupeLink"
                key={i}
                onClick={() => {
                  props.GetGroupConversation(el._id);
                  props.GetConversation("");
                }}
              >
                <div className="GroupeName">{el.GroupeName}</div>
                {el.GroupeCreator._id === User._id ? (
                  <div>
                    <button
                      className="SideBarBtn"
                      onClick={(e) => {
                        dispatch(DeleteGroupe(el._id));
                        UpdateSocket();
                      }}
                    >
                      <DeleteOutlineRoundedIcon />
                    </button>

                    <button
                      className="SideBarBtn"
                      onClick={() => {
                        setGroupe(el);
                        handleEditOpen();
                      }}
                    >
                      <EditOutlinedIcon />
                    </button>
                  </div>
                ) : null}
              </Link>
            </>
          ))}
        </div>
        <h2>Users</h2>
        <div className="OnlineUsersSection">
          {AllUsers.filter((el) => el._id !== User._id).map((el, i) => (
            <Link
              to="/IndvidualChat"
              key={i}
              className="SideBarLink"
              onClick={(e) => {
                e.preventDefault();
                props.setMessage("");
                props.GetConversation(el._id);
                props.GetGroupConversation("");
              }}
            >
              <img
                className="UserImage"
                src={
                  el.picture !== undefined
                    ? `${ServerURI}/${el.picture}`
                    : props.ImagePlaceHolder
                }
                alt="UserPic"
              />
              <h5 className="SideBarUserName">{el.UserName}</h5>
            </Link>
          ))}
        </div>
      </div>
      <ErrorDialogue
        ErrorOpen={ErrorOpen}
        handleClose={handleErrorClose}
        Message={ErrorMessage}
      />
    </Router>
  );
};

export default SideBar;
