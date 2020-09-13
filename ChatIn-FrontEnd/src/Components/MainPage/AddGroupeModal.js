import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { CreateGroupe } from "../../ApiRequests/GroupeRequests";
import { UpdateSocket } from "../../Sockets/UpdateSockets";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    margin: 0,
    width: "40vw",
    height: "20vh",
    padding: theme.spacing(2, 4, 5),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const dispatch = useDispatch();
  const [CheckedUsers, setCheckedUsers] = useState([]);
  const [GroupeName, setGroupeName] = useState("");
  const User = useSelector((state) => state.User);
  const AllUsers = useSelector((state) => state.AllUsers);

  return (
    <div>
      <Dialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.handleClose}>
          Create a Groupe
        </DialogTitle>
        <DialogContent dividers>
          <div>
            <input
              type="text"
              className="ModalInput"
              placeholder="Groupe Name"
              onChange={(e) => {
                setGroupeName(e.target.value);
              }}
            />
            <div className={"UsersList"}>
              <h2>Users</h2>
              <div className="UsersCheckbox">
                {AllUsers.filter((el) => el._id !== User._id).map((el) => (
                  <div>
                    <input
                      type="checkbox"
                      name="User"
                      value={el.UserName}
                      onChange={(e) => {
                        let isChecked = e.target.checked;
                        let SelectedUser = AllUsers.filter(
                          (el) => el.UserName === e.target.value
                        )[0];
                        if (isChecked) {
                          setCheckedUsers([...CheckedUsers, SelectedUser]);
                        } else {
                          let GroupeUsers = CheckedUsers.filter(
                            (el) => el.UserName !== e.target.value
                          );
                          setCheckedUsers(GroupeUsers);
                        }
                      }}
                    />
                    <label htmlfor="User">{el.UserName}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={() => {
              dispatch(
                CreateGroupe({
                  GroupeName,
                  CheckedUsers,
                })
              );
              setCheckedUsers([]);
              setGroupeName("");
              UpdateSocket();
              props.handleClose();
            }}
            color="primary"
          >
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
