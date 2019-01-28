import React, { Component } from "react";

import {
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from "reactstrap";

import { Link } from "react-router-dom";

// assets
import Logo from "../../assets/logo.svg";

// custom Imports
import { clientLinks } from "../../../custom/language";

// context
import { mainContext } from "../../../contexts/mainContext";

// style
import "./style.scss";

class ClientMenu extends Component {
  state = {
    open: false,
    dropdownItems: [
      { text: "login", link: "/login" },
      { text: "register", link: "/register" }
    ]
  };

  componentWillMount() {
    if (this.context.user.loggedIn) {
      this.composeUser();
    } else {
      this.composeNoUser();
    }
  }

  composeUser = () => {
    const dropdownitems = [
      { text: clientLinks[this.context.language].logout, link: "logout" }
    ];

    this.setState({ dropdownItems: dropdownitems });
  };

  composeNoUser = () => {
    const dropdownitems = [
      { text: clientLinks[this.context.language].login, link: "/login" },
      { text: clientLinks[this.context.language].register, link: "/register" }
    ];

    this.setState({ dropdownItems: dropdownitems });
  };

  logout = () => {
    localStorage.removeItem("userToken");
    this.context.update("user", {
      loggedIn: false,
      details: {
        ID: false,
        Name: false,
        Company: false,
        Email: false
      }
    });
    this.composeNoUser();
  };

  toggle = () => {
    this.setState({ open: !this.state.open });
  };
  render() {
    return (
      <div id="clientMenu" style={{ height: "20vh" }}>
        <Dropdown isOpen={this.state.open} toggle={this.toggle}>
          <DropdownToggle id="clientMenuButton">
            <img src={Logo} alt="" />
          </DropdownToggle>
          <DropdownMenu right style={{ marginRight: "1.25em" }}>
            {this.state.dropdownItems.map((item, i) => {
              if (item.link === "logout") {
                return (
                  <DropdownItem
                    key={i}
                    onClick={this.logout}
                    style={{ cursor: "pointer" }}
                  >
                    {item.text}
                  </DropdownItem>
                );
              }
              return (
                <Link key={i} to={item.link}>
                  <DropdownItem style={{ cursor: "pointer" }}>
                    {item.text}
                  </DropdownItem>
                </Link>
              );
            })}
          </DropdownMenu>
        </Dropdown>
      </div>
    );
  }
}

ClientMenu.contextType = mainContext;

export default ClientMenu;
