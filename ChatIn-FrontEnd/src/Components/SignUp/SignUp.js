import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useState } from "react";
import { SignUpApiRequest } from "../../ApiRequests/SignUp";
import { useDispatch } from "react-redux";
import ErrorDialogue from "../ErrorDialogue/ErrorDialogue";

import ChatInLogo from "./ChatInLogo.png";
import { UpdateSocket } from "../../Sockets/UpdateSockets";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ChatIn
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

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
}));

export default function SignUp() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [User, setUser] = useState({ UserName: "", Email: "", Password: "" });
  const [ErrorOpen, setErrorOpen] = useState(false);
  const [ErrorMessage, setErrorMessage] = useState("Fill the form please");

  const handleClickOpen = () => {
    setErrorOpen(true);
  };
  const handleClose = () => {
    setErrorOpen(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <img src={ChatInLogo} alt="logo" width="200px" />
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
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
                onChange={(e) => {
                  User.UserName = e.target.value;
                  setUser(User);
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
                autoComplete="email"
                onChange={(e) => {
                  User.Email = e.target.value;
                  setUser(User);
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
                autoComplete="current-password"
                onChange={(e) => {
                  User.Password = e.target.value;
                  setUser(User);
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

              if (User.UserName === "") {
                setErrorMessage("Fill the UserName input");
                handleClickOpen();
              } else if (
                User.Email === "" ||
                !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/.test(
                  User.Email
                )
              ) {
                setErrorMessage("Fill the Email input correctly");
                handleClickOpen();
              } else if (User.Password === "") {
                setErrorMessage("Fill the password input");
                handleClickOpen();
              } else {
                dispatch(SignUpApiRequest(User));
                UpdateSocket();
              }
            }}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <ErrorDialogue
        ErrorOpen={ErrorOpen}
        handleClose={handleClose}
        Message={ErrorMessage}
      />
    </Container>
  );
}
