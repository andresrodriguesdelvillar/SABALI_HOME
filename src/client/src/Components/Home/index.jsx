import React, { Component } from "react";

// SubComponents

import Background from "./subComponents/background";
import Nav from "../SubComponents/Nav";

class Home extends Component {
  state = {};

  onWorkClick = () => {
    this.props.history.push("/latestwork");
  };
  render() {
    return (
      <div
        id="Homecontainer"
        style={{
          position: "absolute",
          overflow: "hidden",
          width: "100vw",
          height: "100vh"
        }}
      >
        <Nav include={["ClientMenu"]} />
        <Background />
      </div>
    );
  }
}

export default Home;
