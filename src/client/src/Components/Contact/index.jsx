import React, { Component } from "react";

//subcomponents
import Nav from "../SubComponents/Nav";

import ContactBackground from "./subComponents/background";

class Contact extends Component {
  state = {};

  render() {
    return (
      <div
        id="contact"
        style={{
          position: "absolute",
          overflow: "hidden",
          width: "100vw",
          height: `${window.innerHeight}px`
        }}
      >
        {this.props.noNav ? null : (
          <Nav
            wit={true}
            absolute={true}
            include={["ClientMenu", "LanguageSelect"]}
          />
        )}
        <ContactBackground />
      </div>
    );
  }
}

export default Contact;
