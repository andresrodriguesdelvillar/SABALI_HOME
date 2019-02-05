import React, { Component } from "react";

import { Select } from "@material-ui/core";
import Img from "react-webp-image";

// context
import { mainContext } from "../../../contexts/contexts";

//assets
// import english from "./assets/svg/english.svg";
// import english_wit from "./assets/svg/english-wit.svg";
// import webp_english from "./assets/webp/english.webp";
// import webp_english_wit from "./assets/webp/english-wit.webp";

// import deutsch from "./assets/svg/deutsch.svg";
// import deutsch_wit from "./assets/svg/deutsch-wit.svg";
// import webp_deutsch from "./assets/webp/deutsch.webp";
// import webp_deutsch_wit from "./assets/webp/deutsch-wit.webp";

// import nederlands from "./assets/svg/nederlands.svg";
// import nederlands_wit from "./assets/svg/nederlands-wit.svg";
// import webp_nederlands from "./assets/webp/nederlands.webp";
// import webp_nederlands_wit from "./assets/webp/nederlands-wit.webp";

// import espanol from "./assets/svg/espanol.svg";
// import espanol_wit from "./assets/svg/espanol-wit.svg";
// import webp_espanol from "./assets/webp/espanol.webp";
// import webp_espanol_wit from "./assets/webp/espanol-wit.webp";

class LanguageSelect extends Component {
  state = {};

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
        <Select
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
      </div>
    );
  }
}

LanguageSelect.contextType = mainContext;

export default LanguageSelect;
