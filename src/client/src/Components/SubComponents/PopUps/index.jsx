import React, { Component } from "react";

import { Snackbar, IconButton } from "@material-ui/core";

import { alerts } from "../../../custom/language";
import { mainContext } from "../../../contexts/contexts";

import "./style.scss";

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
          <div className="popup">
            <Snackbar
              style={{ width: "100%" }}
              fullWidth
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={this.state.open}
              ContentProps={{
                "aria-describedby": "newContent"
              }}
              message={
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
              action={
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleClose}
                >
                  &times;
                </IconButton>
              }
            />
            {/* <Alert color="info" id="newContentPopup" style={{ margin: 0 }}>
              {text.newContent._1}
              <span
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={this.reload}
                id="popUpReloader"
              >
                {text.newContent.b}
              </span>
              {text.newContent._2}
            </Alert> */}
          </div>
        );
      case "appCached":
        return (
          <div className="popup">
            <Snackbar
              style={{ width: "100%" }}
              fullWidth
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
              open={this.state.open}
              ContentProps={{
                "aria-describedby": "newContent"
              }}
              message={"The Webapp can now be used offline."}
              action={
                <IconButton
                  key="close"
                  aria-label="Close"
                  color="inherit"
                  onClick={this.handleClose}
                >
                  &times;
                </IconButton>
              }
            />
            {/* <Alert color="info" id="ActiveServiceWorker" style={{ margin: 0 }}>
              The Webapp can now be used offline.
            </Alert> */}
          </div>
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
