import React, { Component } from "react";

import Parallax from "parallax-js";

import Img from "react-webp-image";

// customImports
import { parallaxOptions } from "../../../custom/parallaxConfigs";

// images
const img1 = require("../assets/5.buttons.png");
const webp1 = require("../assets/5.buttons.webp");
const img2 = require("../assets/3.aarde.png");
const webp2 = require("../assets/3.aarde.webp");
const img3 = require("../assets/ocean-klein.png");
const webp3 = require("../assets/ocean-klein.webp");
const img4 = require("../assets/sky-klein.jpg");
const webp4 = require("../assets/sky-klein.webp");

const styles = {
  image: {
    width: "100%",
    height: "100%"
  },
  homeLayer: {
    width: "110%",
    height: "110%",
    top: "-5%"
  }
};

class HomeBackground extends Component {
  componentDidMount() {
    new Parallax(document.getElementById("HomeBackground"), parallaxOptions);
  }

  render() {
    return (
      <div id="HomeBackground" style={{ zIndex: -1 }}>
        <div data-depth="0.0" id="layer1">
          <Img
            style={{
              width: "100vw",
              height: "100vh",
              zIndex: -1
            }}
            src={img1}
            webp={webp1}
          />
        </div>
        <div id="layer2" data-depth="1" style={{ width: "110%", zIndex: -2 }}>
          <Img
            style={{ ...styles.image }}
            src={img2}
            webp={webp2}
            alt="The second layer of the background"
          />
        </div>
        <div
          id="layer3"
          data-depth="0.6"
          style={{ ...styles.homeLayer, zIndex: -3 }}
        >
          <Img
            style={{ ...styles.image }}
            src={img3}
            webp={webp3}
            alt="The third layer of the background"
          />
        </div>
        <div
          id="layer4"
          data-depth="0.3"
          style={{ ...styles.homeLayer, zIndex: -4 }}
        >
          <Img
            style={{ ...styles.image }}
            src={img4}
            webp={webp4}
            alt="The fourth layer of the background"
          />
        </div>
      </div>
    );
  }
}

export default HomeBackground;
