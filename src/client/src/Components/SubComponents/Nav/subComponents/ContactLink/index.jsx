import React, { Component } from "react";

import Img from "react-webp-image";

// context
import { mainContext } from "../../../../../contexts/contexts";

// assets
import contact from "../../assets/contact.svg";
import contact_wit from "../../assets/contact-wit.svg";

class ContactLink extends Component {
  state = {};

  transition = () => {
    if (this.props.transition) {
      this.props.transition();
    }
  };
  render() {
    return (
      <div
        style={{
          minWidth: "100px",
          width: "15vw",
          left: 0,
          right: 0,
          margin: "1.5em auto",
          position: "absolute"
        }}
      >
        <div onClick={this.transition}>
          <Img
            onClick={this.transition}
            src={this.props.wit ? contact_wit : contact}
            alt="Contact button"
            width="100%"
          />
        </div>
      </div>
    );
  }
}

ContactLink.contextType = mainContext;

export default ContactLink;
