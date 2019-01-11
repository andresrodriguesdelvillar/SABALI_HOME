import React, { Component } from "react";

import {
  mouseTracker,
  handleOrientation,
  mobileParallax
} from "../../../customFuncs/deviceOrientation";
import { isMobile } from "react-device-detect";
import "./sub.scss";

const img1 = require("../assets/5.buttons.png");
const img2 = require("../assets/4.wolk.png");
const img3 = require("../assets/3.aarde.png");
const img4 = require("../assets/2.zon.png");

class Background extends Component {
  state = {
    orientation: {}
  };

  componentDidMount() {
    if (isMobile) {
      console.log("is Mobile");
      window.addEventListener(
        "deviceorientation",
        this.deviceOrientation,
        true
      );
    } else {
      console.log("is not mobile");
      window.addEventListener("mousemove", mouseTracker, true);
    }
  }

  deviceOrientation = e => {
    const orientation = handleOrientation(e);
    mobileParallax(orientation, window.screen.orientation.type, 5);
  };

  render() {
    return (
      <div id="Background" name="Background">
        <div id="orientation">
          <h1>
            {this.state.orientation.tilt_horizontal}
            <br />
            {this.state.orientation.tilt_vertical}
          </h1>
        </div>
        <div id="layer1">
          <img src={img1} />
        </div>
        <div id="layer2">
          <img src={img2} />
        </div>
        <div id="layer3">
          <img src={img3} />
        </div>
        <div id="layer4">
          <img src={img4} />
        </div>
      </div>
    );
  }
}

export default Background;
