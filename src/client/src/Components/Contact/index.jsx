import React, { Component } from "react";

//subcomponents
import Nav from "../SubComponents/Nav";

import ContactBackground from "./subComponents/background";

// assets

import formBg1 from "./assets/bg_contact_form.svg";

class Contact extends Component {
  state = {};

  componentDidMount() {
    this.props.history.replace({ pathname: "/contact", state: false });
  }

  render() {
    return (
      <div
        id="contact"
        style={{
          overflow: "hidden",
          position: "relative",
          width: "100vw",
          height: "100vh"
        }}
      >
        {this.props.noNav ? null : (
          <Nav
            wit={true}
            absolute={true}
            include={["ClientMenu", "LanguageSelect"]}
          />
        )}
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
        <ContactBackground />
      </div>
    );
  }
}

export default Contact;
