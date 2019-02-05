import React, { Component } from "react";

import { CSSTransition } from "react-transition-group";

import formBg1 from "./assets/bg_contact_form.svg";
import bg1 from "./assets/bg-contact-about.jpg";
import stars1 from "./assets/stars-pre.svg";

//subcomponents
import Nav from "../SubComponents/Nav";

// styles
import "./style.scss";

class Contact extends Component {
  state = {
    appear: true
  };
  render() {
    return (
      <CSSTransition
        in={this.state.appear}
        appear={true}
        timeout={5000}
        classNames="slide"
      >
        <div
          id="contact"
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh"
          }}
        >
          <Nav absolute={true} include={["LanguageSelect"]} />
          <img
            src={bg1}
            alt="Background"
            style={{
              width: "100%",
              height: "100%",
              position: "absolute",
              zIndex: "-1"
            }}
          />
          <img src={stars1} style={{ width: "100%", height: "100%" }} />
          <img
            src={formBg1}
            alt=""
            style={{
              width: "100%",
              position: "absolute",
              left: 0,
              top: "10vh"
            }}
          />
        </div>
      </CSSTransition>
    );
  }
}

export default Contact;
