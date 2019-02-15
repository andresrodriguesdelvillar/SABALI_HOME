import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";

import Img from "react-webp-image";

// assets
import contact from "../../assets/contact.svg";
import contact_wit from "../../assets/contact-wit.svg";

const ContactLink = props => {
  let to = {
    pathname: "/contact"
  };
  if (props.location.pathname === "/") {
    to.state = true;
  }
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
      <NavLink to={to}>
        <Img
          src={props.wit ? contact_wit : contact}
          alt="Contact button"
          width="100%"
        />
      </NavLink>
    </div>
  );
};

export default withRouter(ContactLink);
