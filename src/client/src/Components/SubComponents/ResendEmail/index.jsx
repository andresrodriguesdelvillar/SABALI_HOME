import React, { Component } from "react";

// SubComponent requires Emailadress to resend email to

import { Button } from "@material-ui/core";
// ___custom Imports___
// resend email texts (languages)
import { resendEmail } from "../../../custom/language";
// colors
import { successColor, errorColor } from "../../../custom/colors";
// context
import { withContext } from "../../../custom/withContext";
import { mainContext, fetchContext } from "../../../contexts/contexts";

class ResendEmail extends Component {
  state = {
    resendEmailMessage: ""
  };

  resendEmail = () => {
    const body = {
      Email: this.props.Email,
      Language: this.context.language
    };
    this.props.context
      .post(body, "/user/resendemail")
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({
            resendEmailMessage: {
              text: resendEmail[this.context.language].messages.success,
              color: successColor
            }
          });
          if (this.props.updateTimer) {
            this.props.updateTimer();
          }
        } else {
          this.setState({
            resendEmailMessage: {
              text: resendEmail[this.context.language].messages.error,
              color: errorColor
            }
          });
        }
      })
      .catch(err => {
        this.setState({
          resendEmailMessage: {
            text: resendEmail[this.context.language].messages.error,
            color: errorColor
          }
        });
      });
  };
  render() {
    const text = resendEmail[this.context.language];
    return (
      <div id="resendEmail">
        <div onClick={this.resendEmail}>
          <Button color="primary" variant="contained">
            {text.button}
          </Button>
        </div>
        <p style={{ color: this.state.resendEmailMessage.color }}>
          {this.state.resendEmailMessage.text}
        </p>
      </div>
    );
  }
}

ResendEmail.contextType = mainContext;

export default withContext(fetchContext, ResendEmail);
