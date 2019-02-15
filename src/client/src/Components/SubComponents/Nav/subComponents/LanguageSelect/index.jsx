import React, { Component } from "react";

import Img from "react-webp-image";

// context
import { mainContext } from "../../../../../contexts/contexts";

//assets
import english from "./assets/svg/english.svg";
import english_wit from "./assets/svg/english-wit.svg";

import deutsch from "./assets/svg/deutsch.svg";
import deutsch_wit from "./assets/svg/deutsch-wit.svg";

import nederlands from "./assets/svg/nederlands.svg";
import nederlands_wit from "./assets/svg/nederlands-wit.svg";

import espanol from "./assets/svg/espanol.svg";
import espanol_wit from "./assets/svg/espanol-wit.svg";

// components
import {
  DropDown,
  DropDownButton,
  DropDownMenu,
  DropDownItem
} from "../../../Dropdown";

class LanguageSelect extends Component {
  languageImages = {
    en: <Img src={this.props.wit ? english_wit : english} alt="english" />,
    de: <Img src={this.props.wit ? deutsch_wit : deutsch} alt="deutsch" />,
    nl: (
      <Img
        src={this.props.wit ? nederlands_wit : nederlands}
        alt="nederlands"
      />
    ),
    es: <Img src={this.props.wit ? espanol_wit : espanol} alt="español" />
  };
  changeLang = e => {
    e.preventDefault();
    localStorage.userLanguage = e.target.id;
    this.context.update("language", e.target.id);
  };

  render() {
    return (
      <div
        id="languageSelect"
        style={{
          position: "absolute",
          margin: "0.5em 1em 0 0",
          right: 0,
          width: "15vw",
          height: "100",
          minWidth: "120px"
        }}
      >
        <DropDown width="100%">
          <DropDownButton>
            {this.languageImages[this.context.language]}
          </DropDownButton>
          <DropDownMenu>
            <DropDownItem>
              <Img
                id="en"
                onClick={this.changeLang}
                src={this.props.wit ? english_wit : english}
                alt="english"
              />
            </DropDownItem>
            <DropDownItem>
              <Img
                id="de"
                onClick={this.changeLang}
                src={this.props.wit ? deutsch_wit : deutsch}
                alt="deutsch"
              />
            </DropDownItem>
            <DropDownItem>
              <Img
                id="nl"
                onClick={this.changeLang}
                src={this.props.wit ? nederlands_wit : nederlands}
                alt="nederlands"
              />
            </DropDownItem>
            <DropDownItem>
              <Img
                id="es"
                onClick={this.changeLang}
                src={this.props.wit ? espanol_wit : espanol}
                alt="español"
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
