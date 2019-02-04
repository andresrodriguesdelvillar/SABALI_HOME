import React, { Component, Fragment } from "react";

import Img from "react-webp-image";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { Link } from "react-router-dom";

// assets
import Logo from "../../assets/logo.svg";
import webpLogo from "../../assets/logo.webp";

// custom Imports
import { clientLinks } from "../../../custom/language";

// context
import { mainContext } from "../../../contexts/contexts";

class ClientMenu extends Component {
  state = {
    open: false
  };

  componentWillMount() {
    this.context.handleUserAuth();
  }

  logout = () => {
    localStorage.removeItem("userToken");
    this.context.handleUserAuth();
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const lang = clientLinks[this.context.language];
    const LoggedIn = (
      <DropdownItem onClick={this.logout} style={{ cursor: "pointer" }}>
        {lang.logout}
      </DropdownItem>
    );
    const notLoggedIn = (
      <Fragment>
        <Link to="/login">
          <DropdownItem style={{ cursor: "pointer" }}>
            {lang.login}
          </DropdownItem>
        </Link>
        <Link to="register">
          <DropdownItem style={{ cursor: "pointer" }}>
            {lang.register}
          </DropdownItem>
        </Link>
      </Fragment>
    );
    return (
      <div id="clientMenu" style={{ float: "right" }}>
        <Dropdown isOpen={this.state.open} toggle={this.toggle}>
          <DropdownToggle
            style={{
              backgroundColor: "transparent",
              border: "none",
              boxShadow: "none",
              width: "15vw",
              minWidth: "75px"
            }}
            id="clientMenuButton"
            aria-label="client menu"
          >
            <Img
              src={Logo}
              webp={webpLogo}
              alt="clientButton Image"
              style={{ width: "100%" }}
            />
          </DropdownToggle>
          <DropdownMenu right style={{ marginRight: "1.25em", width: "15vw" }}>
            {this.context.loggedIn ? LoggedIn : notLoggedIn}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

ClientMenu.contextType = mainContext;

export default ClientMenu;
