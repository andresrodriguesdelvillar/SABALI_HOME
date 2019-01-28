import React, { Component } from "react";

import { Select } from "@material-ui/core";

import { mainContext } from "../../../contexts/mainContext";

import "./style.scss";

class LanguageSelect extends Component {
  state = {};

  changeLang = e => {
    localStorage.userLanguage = e.target.value;
    this.context.update("language", e.target.value);
  };
  render() {
    return (
      <div id="languageSelect">
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
