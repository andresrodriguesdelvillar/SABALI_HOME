import React, { Component } from "react";

import Parallax from "parallax-js";

import Img from "react-webp-image";

// customImports
import { parallaxOptions } from "../../../custom/parallaxConfigs";

import { getOverlap } from "../../../custom/helpers";

// images
const img2 = require("../assets/3.aarde.png");
const webp2 = require("../assets/3.aarde.webp");
const img3 = require("../assets/ocean-klein.png");
const webp3 = require("../assets/ocean-klein.webp");
const img4 = require("../assets/home-bg.jpg");
const webp4 = require("../assets/sky-klein.webp");

const styles = {
  image: {
    width: "100%"
  },
  homeLayer: {}
};

class HomeBackground extends Component {
  componentDidMount() {
    new Parallax(document.getElementById("HomeBackground"), parallaxOptions);
  }

  render() {
    return (
      <div
        id="HomeBackground"
        style={{
          zIndex: -1,
          height: `115%`,
          width: window.innerWidth * 1.3,
          top: getOverlap(window.innerWidth * 1.3 * 0.9, 1385 / 2880),
          left: "-15%"
        }}
      >
        <div
          id="layer2"
          data-depth="1"
          style={{ ...styles.homeLayer, zIndex: -2, width: "100%" }}
        >
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
          style={{
            ...styles.homeLayer,
            zIndex: -3,
            width: "90%",
            margin: "0 auto",
            left: 0,
            right: 0
          }}
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
          data-depth="0.2"
          style={{
            ...styles.homeLayer,
            zIndex: -4,
            width: "90%",
            margin: "0 auto",
            left: 0,
            right: 0
          }}
        >
          <Img
            id="home_bg"
            style={{ ...styles.image }}
            src={img4}
            //webp={webp4}
            alt="The fourth layer of the background"
          />
        </div>
      </div>
    );
  }
}

export default HomeBackground;
