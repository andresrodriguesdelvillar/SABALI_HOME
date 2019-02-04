import React, { Component } from "react";

import Img from "react-webp-image";

//context
import { mainContext } from "../../../contexts/contexts";

// customFuncs
import {
  getMousePosition,
  mouseParallax,
  getOrientation,
  mobileParallax
} from "../../../custom/deviceOrientation";

import "./sub.scss";

const img1 = require("../assets/5.buttons.png");
const webp1 = require("../assets/5.buttons.webp");
const img2 = require("../assets/3.aarde.png");
const webp2 = require("../assets/3.aarde.webp");
const img3 = require("../assets/ocean-klein.png");
const webp3 = require("../assets/ocean-klein.webp");
const img4 = require("../assets/sky-klein.jpg");
const webp4 = require("../assets/sky-klein.webp");

class Background extends Component {
  componentDidMount() {
    // check if mobile
    if (this.context.isMobile) {
      console.log("is Mobile");
      // add Eventlistener for mobile device tilt
      document.addEventListener(
        "deviceorientation",
        this.deviceOrientation,
        true
      );
    } else {
      console.log("is not mobile");
      // add Eventlistener for mouseMovement on desktop
      document.addEventListener("mousemove", this.mouseParallax, true);
    }
  }

  componentWillUnmount() {
    if (this.context.isMobile) {
      document.removeEventListener(
        "deviceorientation",
        this.deviceOrientation,
        true
      );
    } else {
      document.removeEventListener("mousemove", this.mouseParallax, true);
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
    mouseParallax(mousePosition, layers, 2);
  };

  deviceOrientation = e => {
    // creates Device-tilt Parallax
    const orientation = getOrientation(e);
    this.setState({ deviceOrientation: orientation.tilt_horizontal });
    const layers = {
      layer2: [-32, -32],
      layer3: [-16, -16],
      layer4: [-9, -9]
    };
    mobileParallax(orientation, window.screen.orientation.type, 2, layers);
  };

  render() {
    return (
      <div id="Background" name="Background">
        <div id="layer1">
          <Img className="homeLayer" src={img1} webp={webp1} />
        </div>
        <div id="layer2">
          <Img
            className="homeLayer"
            src={img2}
            webp={webp2}
            alt="The second layer of the background"
          />
        </div>
        <div id="layer3">
          <Img
            className="homeLayer"
            src={img3}
            webp={webp3}
            alt="The third layer of the background"
          />
        </div>
        <div id="layer4">
          <Img
            className="homeLayer"
            src={img4}
            webp={webp4}
            alt="The fourth layer of the background"
          />
        </div>
      </div>
    );
  }
}

Background.contextType = mainContext;

export default Background;
