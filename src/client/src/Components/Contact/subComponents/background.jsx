import React, { Component } from "react";

import Parallax from "parallax-js";

// customImports
import { parallaxOptions } from "../../../custom/parallaxConfigs";

// images
import formBg1 from "../assets/bg_contact_form.svg";
import bg1 from "../assets/bg-contact-about.jpg";
import stars1 from "../assets/stars-pre.svg";

// styles
const styles = {
  Layer: {
    width: "110%",
    height: "110%"
  },
  image: {
    width: "100%",
    height: "100%"
  }
};

class ContactBackground extends Component {
  state = {};
  componentDidMount() {
    new Parallax(document.getElementById("ContactBackground"), parallaxOptions);
  }
  render() {
    return (
      <div id="ContactBackground" style={{ zIndex: -1, height: "100%" }}>
        <div
          style={{
            width: "100%",
            zIndex: -2,
            textAlign: "center"
          }}
        >
          <img
            src={formBg1}
            alt=""
            style={{
              width: "80%",
              marginTop: "20vh"
            }}
          />
        </div>
        <div data-depth="1" style={{ ...styles.Layer, zIndex: -3 }}>
          <img src={stars1} style={{ ...styles.image, zIndex: -3 }} />
        </div>
        <div data-depth="0.5" style={{ ...styles.Layer, zIndex: -4 }}>
          <img
            src={bg1}
            alt="Background"
            style={{
              ...styles.image,
              zIndex: -4
            }}
          />
        </div>
      </div>
    );
  }
}

export default ContactBackground;
