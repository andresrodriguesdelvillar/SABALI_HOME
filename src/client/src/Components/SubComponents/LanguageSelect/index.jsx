import React, { Component } from "react";

import { Select } from "@material-ui/core";

import { mainContext } from "../../../contexts/contexts";

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
