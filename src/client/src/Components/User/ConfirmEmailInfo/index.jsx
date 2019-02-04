import React, { Component } from "react";

import jwt from "jsonwebtoken";

// subComponents
import Nav from "../../SubComponents/Nav";
import Timer from "../../SubComponents/Timer";
import ResendEmail from "../../SubComponents/ResendEmail";
import ChangeEmail from "../../SubComponents/ChangeEmail";

// context
import { mainContext } from "../../../contexts/contexts";

// custom imports
import { confirmEmailInfo } from "../../../custom/language";
import { tokenExpires } from "../../../../../server/config/main";

class ConfirmEmailInfo extends Component {
  state = {};
  componentWillMount() {
    const token = this.props.location.search.substring(1);
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        this.props.history.push("/register");
      } else {
        this.setState(decoded);
      }
    });
  }

  handleEmailChange = newEmail => {
    this.setState({
      Email: newEmail,
      exp: Date.now() / 1000 + tokenExpires.confirmationMail
    });
  };

  updateTimer = () => {
    this.setState({ exp: Date.now() / 1000 + tokenExpires.confirmationMail });
  };
  render() {
    const text = confirmEmailInfo[this.context.language];
    return (
      <div id="confirmEmail">
        <Nav include={["LanguageSelect"]} />
        <div className="container">
          <div id="confirmEmailInfo" style={{ marginTop: "5em" }}>
            <h3>
              {text.main}
              <span style={{ fontWeight: "bold" }}>{this.state.Email}</span>
            </h3>
            <Timer
              expires={this.state.exp}
              text={{ _1: text.timer_1, _2: text.timer_2 }}
            />
            <h4>{text.resendEmail}</h4>
            <ResendEmail
              className="resendEmail"
              Email={this.state.Email}
              updateTimer={this.updateTimer}
              style={{ marginTop: "1em" }}
            />
            <h4>{text.changeEmail}</h4>
            <ChangeEmail
              oldEmail={this.state.Email}
              change={this.handleEmailChange}
              style={{ marginTop: "1em" }}
            />
          </div>
        </div>
      </div>
    );
  }
}

ConfirmEmailInfo.contextType = mainContext;

export default ConfirmEmailInfo;
