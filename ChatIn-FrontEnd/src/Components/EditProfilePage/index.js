import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { EditProfileApi } from "../../ApiRequests/EditProfileApi";
import { ServerURI } from "../../ApiRequests/Config";

const ImagePlaceHolder =
  "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  FileUploadInput: {
    color: "red",
  },
}));

export default function EditProfile(props) {
  const dispatch = useDispatch();
  const User = useSelector((state) => state.User);
  const classes = useStyles();
  const [Profile, setProfile] = useState({
    UserName: User.UserName,
    Email: User.Email,
    Password: User.Password,
  });
  const [SelectedFile, setSelectedFile] = useState();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />

      <div className={classes.paper}>
        <img
          src={
            User.picture !== undefined
              ? `${ServerURI}/${User.picture}`
              : ImagePlaceHolder
          }
          alt=""
          height="200px"
        />
        <input
          className={classes.FileUploadInput}
          type="file"
          name="Picture"
          onChange={(e) => {
            setSelectedFile(e.target.files[0]);
          }}
        />
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="User name"
                autoFocus
                defaultValue={Profile.UserName}
                onChange={(e) => {
                  Profile.UserName = e.target.value;
                  setProfile(Profile);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                defaultValue={Profile.Email}
                onChange={(e) => {
                  Profile.Email = e.target.value;
                  setProfile(Profile);
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                defaultValue={Profile.Password}
                onChange={(e) => {
                  Profile.Password = e.target.value;
                  setProfile(Profile);
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              dispatch(
                EditProfileApi({ _id: User._id, Profile }, SelectedFile)
              );
            }}
          >
            Save
          </Button>
          <Link to="/IndvidualChat">
            <Button>Back</Button>
          </Link>
        </form>
      </div>
    </Container>
  );
}
