import React, { Component } from "react";

import { Link } from "react-router-dom";
// SubComponents

// import {
//   Client,
//   MainLogo,
//   Contact,
//   Team,
//   LatestWork
// } from "./subComponents/functional"
import Background from "./subComponents/background";

import "./Home.scss";

class Home extends Component {
  state = {};

  onWorkClick = () => {
    this.props.history.push("/latestwork");
  };
  render() {
    return (
      <div className="Homecontainer">
        <Link to="/login" id="link">
          login
        </Link>
        <Link to="/register" id="link">
          register
        </Link>
        <Background />
      </div>
    );
  }
}

export default Home;
