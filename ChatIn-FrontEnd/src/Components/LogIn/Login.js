import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";

import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import ChatInLogo from "./ChatInLogo.png";
import { LoginApiRequest } from "../../ApiRequests/Login";
import { useDispatch } from "react-redux";
import ErrorDialogue from "../ErrorDialogue/ErrorDialogue";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        ChatIn
      </Link>
      {new Date().getFullYear()}
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  //const User = useSelector((state) => state.User);
  const [Coords, setCoords] = useState({ UserName: "", Password: "" });
  const dispatch = useDispatch();
  const classes = useStyles();

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
          Sign in
        </Typography>
        <div>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="User Name"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(e) => {
              Coords.UserName = e.target.value;
              setCoords(Coords);
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={(e) => {
              Coords.Password = e.target.value;

              setCoords(Coords);
            }}
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              if (Coords.UserName === "") {
                setErrorMessage("Fill the UserName input");
                handleClickOpen();
              } else if (Coords.Password === "") {
                setErrorMessage("Fill the passwor input");
                handleClickOpen();
              } else {
                dispatch(LoginApiRequest(Coords));
              }
            }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="./SignUp" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </div>
      </div>
      <Box mt={8}>
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
