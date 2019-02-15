import React, { Component } from "react";

//subcomponents
import Nav from "../SubComponents/Nav";

import ContactBackground from "./subComponents/background";

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
          width: "100%",
          height: `100vh`
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
