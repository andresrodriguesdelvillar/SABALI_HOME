import React, { Component } from "react";

import { Link } from "react-router-dom";
// SubComponents

// import {
//   Client,
//   MainLogo,
//   Contact,
//   Team,
//   LatestWork
// } from "./subComponents/functional";

import Backgrund from "./subComponents/background";

import "./Home.scss";

//const latestWorkLogo = require("./assets/like.png");

class Home extends Component {
  state = {};

  onWorkClick = () => {
    this.props.history.push("/latestwork");
  };
  render() {
    return (
      <div className="Homecontainer">
        <Backgrund />
      </div>
    );
  }
}

export default Home;
