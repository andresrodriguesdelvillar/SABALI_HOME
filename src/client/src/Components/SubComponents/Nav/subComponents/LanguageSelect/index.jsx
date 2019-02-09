import React, { Component } from "react";

import Img from "react-webp-image";

// context
import { mainContext } from "../../../../../contexts/contexts";

//assets
import english from "./assets/svg/english.svg";
import english_wit from "./assets/svg/english-wit.svg";
import webp_english from "./assets/webp/english.webp";
import webp_english_wit from "./assets/webp/english-wit.webp";

import deutsch from "./assets/svg/deutsch.svg";
import deutsch_wit from "./assets/svg/deutsch-wit.svg";
import webp_deutsch from "./assets/webp/deutsch.webp";
import webp_deutsch_wit from "./assets/webp/deutsch-wit.webp";

import nederlands from "./assets/svg/nederlands.svg";
import nederlands_wit from "./assets/svg/nederlands-wit.svg";
import webp_nederlands from "./assets/webp/nederlands.webp";
import webp_nederlands_wit from "./assets/webp/nederlands-wit.webp";

import espanol from "./assets/svg/espanol.svg";
import espanol_wit from "./assets/svg/espanol-wit.svg";
import webp_espanol from "./assets/webp/espanol.webp";
import webp_espanol_wit from "./assets/webp/espanol-wit.webp";

// components
import {
  DropDown,
  DropDownButton,
  DropDownMenu,
  DropDownItem
} from "../../../Dropdown";

class LanguageSelect extends Component {
  changeLang = e => {
    e.preventDefault();
    localStorage.userLanguage = e.target.value;
    this.context.update("language", e.target.value);
  };

  render() {
    return (
      <div
        id="languageSelect"
        style={{
          margin: "0.5em 1em 0 0",
          float: "right",
          minWidth: "48px"
        }}
      >
        <DropDown>
          <DropDownButton>
            <Img
              style={{ float: "left", minWidth: "100px", width: "15vw" }}
              src={this.props.wit ? english_wit : english}
              webp={this.props.wit ? webp_english_wit : webp_english}
              alt="Sabali Logo"
            />
          </DropDownButton>
          <DropDownMenu>
            <DropDownItem>
              <Img
                style={{ float: "left", minWidth: "100px", width: "15vw" }}
                src={this.props.wit ? english_wit : english}
                webp={this.props.wit ? webp_english_wit : webp_english}
                alt="Sabali Logo"
              />
            </DropDownItem>
            <DropDownItem>
              <Img
                style={{ float: "left", minWidth: "100px", width: "15vw" }}
                src={this.props.wit ? deutsch_wit : deutsch}
                webp={this.props.wit ? webp_deutsch_wit : webp_deutsch}
                alt="Sabali Logo"
              />
            </DropDownItem>
            <DropDownItem>
              <Img
                style={{ float: "left", minWidth: "100px", width: "15vw" }}
                src={this.props.wit ? nederlands_wit : nederlands}
                webp={this.props.wit ? webp_nederlands_wit : webp_nederlands}
                alt="Sabali Logo"
              />
            </DropDownItem>
            <DropDownItem>
              <Img
                style={{ float: "left", minWidth: "100px", width: "15vw" }}
                src={this.props.wit ? espanol_wit : espanol}
                webp={this.props.wit ? webp_espanol_wit : webp_espanol}
                alt="Sabali Logo"
              />
            </DropDownItem>
          </DropDownMenu>
        </DropDown>
      </div>
    );
  }
}

LanguageSelect.contextType = mainContext;

export default LanguageSelect;
