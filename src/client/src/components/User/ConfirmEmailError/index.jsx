import React, { Component } from "react";

import { confirmError } from "../../../custom/language";
import { mainContext } from "../../../contexts/mainContext";

class ConfirmError extends Component {
  state = {};
  render() {
    const text = confirmError[this.context.language].text;
    return (
      <div id="ConfirmError">
        <div className="container">
          <h3>{text}</h3>
        </div>
      </div>
    );
  }
}

ConfirmError.contextType = mainContext;

export default ConfirmError;
