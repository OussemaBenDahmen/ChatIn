import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import { useSelector, useDispatch } from "react-redux";

import { EditGroupe } from "../../ApiRequests/GroupeRequests";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "none",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    minHeight: "300px",
    minWidth: "300px",
  },
}));

const Fade = React.forwardRef(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element,
  in: PropTypes.bool.isRequired,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
};

export default function EditGroupeModal(props) {
  const dispatch = useDispatch();
  const [CheckedUsers, setCheckedUsers] = useState(props.GroupeUsers || []);
  const [GroupeName, setGroupeName] = useState(props.GroupeName);
  const classes = useStyles();
  const User = useSelector((state) => state.User);
  const AllUsers = useSelector((state) => state.AllUsers);

  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        className={classes.modal}
        open={props.EditOpen}
        onClose={props.handleEditClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.EditOpen}>
          <div className={classes.paper}>
            <input
              type="text"
              placeholder="Groupe Name"
              defaultValue={props.GroupeName}
              onChange={(e) => {
                console.log(GroupeName);
                setGroupeName(e.target.value);
              }}
            />
            <div className="UsesersList">
              {AllUsers.filter((el) => el._id !== User._id).map((el) => (
                <>
                  <input
                    key={el._id}
                    type="checkbox"
                    name="User"
                    value={el.UserName}
                    checked={
                      CheckedUsers.some((GrpUser) => GrpUser._id === el._id)
                        ? true
                        : false
                    }
                    onChange={(e) => {
                      let isChecked = e.target.checked;
                      let SelectedUser = AllUsers.filter(
                        (el) => el.UserName === e.target.value
                      )[0];
                      if (isChecked) {
                        setCheckedUsers([...CheckedUsers, SelectedUser]);
                      } else {
                        e.target.checked = false;
                        let GroupeUsers = CheckedUsers.filter(
                          (el) => el.UserName !== e.target.value
                        );
                        setCheckedUsers(GroupeUsers);
                      }
                      console.log(CheckedUsers);
                    }}
                  />
                  <label htmlfor="User">{el.UserName}</label>
                </>
              ))}
            </div>
            <button
              onClick={() => {
                console.log("groupe added");
                dispatch(
                  EditGroupe({
                    GroupeId: props.GroupeId,
                    GroupeName,
                    CheckedUsers,
                  })
                );
                setCheckedUsers([]);
                setGroupeName("");
                props.handleEditClose();
              }}
            >
              Save
            </button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
