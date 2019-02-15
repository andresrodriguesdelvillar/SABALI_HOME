import React, { Component } from "react";

import { Snackbar, IconButton } from "@material-ui/core";
import PopUp from "../react-PopUp";

import { alerts } from "../../../custom/language";
import { mainContext } from "../../../contexts/contexts";

class PopUps extends Component {
  state = {
    open: true
  };

  reload = () => {
    window.close();
    setTimeout(() => {
      window.open("https://sabali.herokuapp.com");
    }, 1000);
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRender = () => {
    const text = alerts[this.context.language];
    switch (this.props.popup) {
      case "newContent":
        return (
          <PopUp
            content={
              <span id="newContent">
                {text.newContent._1}
                <span
                  style={{ cursor: "pointer", fontWeight: "bold" }}
                  onClick={this.reload}
                  id="popUpReloader"
                >
                  {text.newContent.b}
                </span>
                {text.newContent._2}
              </span>
            }
            duration="15"
          />
        );
      case "appCached":
        return (
          <PopUp content="The Webapp can now be used offline." duration="5" />
        );
      default:
        return null;
    }
  };

  render() {
    return this.handleRender();
  }
}

PopUps.contextType = mainContext;

export default PopUps;
