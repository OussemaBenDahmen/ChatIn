import React from "react";
import "./style.css";
import Button from "@material-ui/core/Button";
import SwipeableTextMobileStepper from "./Carousel.js";
const LandingPage = () => {
  return (
    <div className="LandingPage">
      <header className="LandingPage-Header">
        <div className="SignBtns">
          <Button variant="contained" className="SecondairyBackground">
            Sign in
          </Button>
          <Button variant="contained" className="ThirdBackground">
            Sign Up
          </Button>
        </div>
      </header>
      <main className="LandingPage-Main">
        <SwipeableTextMobileStepper />
      </main>
      <footer className="LandingPage-Footer">
        <p className="ThirdColor">CopyRights</p>
        <p className="ThirdColor">Powered By Oussema</p>
      </footer>
    </div>
  );
};

export default LandingPage;
