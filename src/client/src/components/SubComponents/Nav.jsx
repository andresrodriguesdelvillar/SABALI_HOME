import React, { Component } from "react";

import { Select } from "@material-ui/core";
import { NavLink } from "react-router-dom";

import Logo from "../assets/sbali-logo-2.svg";

// // context
import { mainContext } from "../../contexts/mainContext";

//style
import "./style.scss";

class Nav extends Component {
  state = {};

  changeLang = e => {
    this.context.update("language", e.target.value);
  };

  render() {
    return (
      <div id="Nav">
        <nav>
          <NavLink to="/">
            <img
              id="Logo"
              src={Logo}
              alt="Sabali Logo"
              x="6"
              y="5"
              width="184"
              height="54"
            />
          </NavLink>
          <Select
            style={{ float: "right", margin: "2vh 2vw 0 0" }}
            value={this.context.language}
            id="language_select"
            onChange={this.changeLang}
            native={true}
            fullWidth={false}
          >
            <option value="en">english</option>
            <option value="de">deutsch</option>
            <option value="es">español</option>
            <option value="nl">nederlands</option>
          </Select>
        </nav>
      </div>
    );
  }
}

Nav.contextType = mainContext;

export default Nav;
