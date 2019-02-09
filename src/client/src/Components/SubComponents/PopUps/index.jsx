import React, { Component } from "react";

import { Alert } from "reactstrap";

import { alerts } from "../../../custom/language";
import { mainContext } from "../../../contexts/contexts";

import "./style.scss";

class PopUps extends Component {
  state = {
    timer: 10
  };

  componentDidMount() {
    this.handleTimer();
  }

  handleTimer = () => {
    const interval = setInterval(() => {
      if (this.state.timer < 1) {
        this.setState({ timer: 0 });
        clearInterval(interval);
      }
      this.setState({ timer: this.state.timer - 1 });
    }, 1000);
  };

  reload = () => {
    window.close();
    setTimeout(() => {
      window.open("https://sabali.herokuapp.com");
    }, 1000);
  };

  handleRender = () => {
    const text = alerts[this.context.language];
    switch (this.props.popup) {
      case "newContent":
        return (
          <div className="popup">
            <Alert color="info" id="newContentPopup" style={{ margin: 0 }}>
              {text.newContent._1}
              <span
                style={{ cursor: "pointer", fontWeight: "bold" }}
                onClick={this.reload}
                id="popUpReloader"
              >
                {text.newContent.b}
              </span>
              {text.newContent._2}
            </Alert>
          </div>
        );
      case "appCached":
        return (
          <div className="popup">
            <Alert color="info" id="ActiveServiceWorker" style={{ margin: 0 }}>
              The Webapp can now be used offline.
            </Alert>
          </div>
        );
      default:
        return null;
    }
  };

  render() {
    return this.state.timer > 0 ? this.handleRender() : null;
  }
}

PopUps.contextType = mainContext;

export default PopUps;
