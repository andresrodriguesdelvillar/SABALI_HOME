import React, { Component } from "react";

import Img from "react-webp-image";

import { Link } from "react-router-dom";

// assets
import client from "../../assets/client.svg";
import client_wit from "../../assets/client-wit.svg";

// custom Imports
import { clientLinks } from "../../../../../custom/language";

// components
import {
  DropDown,
  DropDownButton,
  DropDownMenu,
  DropDownItem
} from "../../../Dropdown";

// context
import { mainContext } from "../../../../../contexts/contexts";

class ClientMenu extends Component {
  logout = () => {
    localStorage.removeItem("userToken");
    this.context.handleUserAuth();
  };
  render() {
    const lang = clientLinks[this.context.language];
    const LoggedIn = (
      <DropDownMenu>
        <DropDownItem>
          <div onClick={this.logout}>{lang.logout}</div>
        </DropDownItem>
      </DropDownMenu>
    );
    const notLoggedIn = (
      <DropDownMenu>
        <DropDownItem>
          <Link to="/login">{lang.login}</Link>
        </DropDownItem>
        <DropDownItem>
          <Link to="register">{lang.register}</Link>
        </DropDownItem>
      </DropDownMenu>
    );
    return (
      <div
        id="clientMenu"
        style={{
          float: "right",
          margin: "1vh 1vh 0 0",
          width: "15vw",
          minWidth: "75px"
        }}
      >
        <DropDown>
          <DropDownButton>
            <Img
              src={this.props.wit ? client_wit : client}
              alt="clientButton Image"
              style={{ width: "100%" }}
            />
          </DropDownButton>

          {this.context.loggedIn ? LoggedIn : notLoggedIn}
        </DropDown>
      </div>
    );
  }
}

ClientMenu.contextType = mainContext;

export default ClientMenu;
