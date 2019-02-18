import React, { Component } from "react";

import Img from "react-webp-image";

// SubComponents
import Nav from "../SubComponents/Nav";
import HomeBackground from "./subComponents/background";

// assets

const img1 = require("./assets/5.buttons.png");
const webp1 = require("./assets/5.buttons.webp");

class Home extends Component {
  render() {
    return (
      <div
        id="Home"
        style={{
          overflow: "hidden",
          position: "relative",
          width: "100vw",
          height: "100vh"
        }}
      >
        {this.props.noNav ? null : (
          <Nav absolute include={["ClientMenu", "ContactLink"]} />
        )}
        <div
          id="layer1"
          style={{
            height: "100vh",
            width: "100vw",
            position: "absolute",
            zIndex: 1
          }}
        >
          <Img
            style={{
              width: "100%",
              height: "100%",
              zIndex: -1
            }}
            src={img1}
            webp={webp1}
          />
        </div>
        <HomeBackground />
      </div>
    );
  }
}

export default Home;
