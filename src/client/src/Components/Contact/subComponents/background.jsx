import React, { Component } from "react";

import Parallax from "parallax-js";

// customImports
import { parallaxOptions } from "../../../custom/parallaxConfigs";

import { getOverlap } from "../../../custom/helpers";

// images
import bg1 from "../assets/contact-bg.jpg";
import stars1 from "../assets/stars-pre.svg";

// styles
const styles = {
  Layer: {
    position: "relative",
    margin: "0 auto",
    left: 0,
    right: 0,
    bottom: 0
  },
  image: {
    position: "absolute",
    width: "100%"
  }
};

class ContactBackground extends Component {
  componentDidMount() {
    new Parallax(document.getElementById("ContactBackground"), parallaxOptions);
  }
  render() {
    return (
      <div
        id="ContactBackground"
        style={{
          zIndex: -1,
          position: "absolute",
          height: `115%`,
          width: window.innerWidth * 1.3,
          bottom: getOverlap(window.innerWidth * 1.3 * 0.9, 1385 / 2880),
          left: "-15%"
        }}
      >
        <div
          data-depth="0.6"
          style={{ ...styles.Layer, zIndex: -3, width: "100%", bottom: 0 }}
        >
          <img src={stars1} style={{ ...styles.image }} />
        </div>
        <div
          data-depth="0.2"
          style={{
            ...styles.Layer,
            zIndex: -4,
            width: "90%"
          }}
        >
          <img
            src={bg1}
            id="contact_bg_image"
            alt="Background"
            style={{
              ...styles.image,
              bottom: 0
            }}
          />
        </div>
      </div>
    );
  }
}

export default ContactBackground;
