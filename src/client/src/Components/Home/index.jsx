import React, { Component } from "react";

// SubComponents

import Background from "./subComponents/background";
import Nav from "../SubComponents/Nav";

import "./Home.scss";

class Home extends Component {
  state = {};

  onWorkClick = () => {
    this.props.history.push("/latestwork");
  };
  render() {
    return (
      <div id="Homecontainer">
        <Nav include={["ClientMenu"]} />
        <Background />
      </div>
    );
  }
}

export default Home;
