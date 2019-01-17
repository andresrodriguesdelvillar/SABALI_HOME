import React, { Component } from "react";

import mainContext from "../../../contexts/mainContext";

import {
  getMousePosition,
  mouseParallax,
  getOrientation,
  mobileParallax
} from "../../../customFuncs/deviceOrientation";

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
    // check if mobile
    if (this.context.mobile) {
      console.log("is Mobile");
      // add Eventlistener for mobile device tilt
      window.addEventListener(
        "deviceorientation",
        this.deviceOrientation,
        true
      );
    } else {
      console.log("is not mobile");
      // add Eventlistener for mouseMovement on desktop
      window.addEventListener("mousemove", this.mouseParallax, true);
    }
  }

  mouseParallax = e => {
    // creates Mouse Parallax
    const mousePosition = getMousePosition(e);
    const layers = {
      layer2: [-32, -32],
      layer3: [-16, -16],
      layer4: [-9, -9]
    };
    mouseParallax(mousePosition, layers, 5);
  };

  deviceOrientation = e => {
    // creates Device-tilt Parallax
    const orientation = getOrientation(e);
    const layers = {
      layer2: [-32, -32],
      layer3: [-16, -16],
      layer4: [-9, -9]
    };
    mobileParallax(orientation, window.screen.orientation.type, 5, layers);
  };

  render() {
    console.log(this.context.userLocation);
    return (
      <div id="Background" name="Background">
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

Background.contextType = mainContext;

export default Background;
