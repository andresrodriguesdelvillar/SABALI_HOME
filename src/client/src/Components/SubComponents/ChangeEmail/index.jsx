import React, { Component } from "react";

import { FormControl, TextField, Button } from "@material-ui/core";

// contexts
import { mainContext, fetchContext } from "../../../contexts/contexts";
import { withContexts } from "../../../custom/withContext";
// custom Imports
import { changeEmail } from "../../../custom/language";
import { validate } from "../../../../../customFuncs/validation";
import { successColor, errorColor } from "../../../custom/colors";

class ChangeEmail extends Component {
  state = {
    newEmail: "",
    oldEmail: this.props.oldEmail,
    Password: "",
    emailError: true,
    changeEmailRes: ""
  };

  fetchContext = this.props.context.fetchContext;
  mainContext = this.props.context.mainContext;

  submit = e => {
    e.preventDefault();
    const data = {
      newEmail: this.state.newEmail,
      oldEmail: this.state.oldEmail,
      Password: this.state.Password,
      Language: this.mainContext.language
    };
    this.fetchContext
      .post(data, "/user/changeemail")
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({
            changeEmailRes: {
              text: changeEmail[this.mainContext.language].result.success,
              color: successColor
            },
            oldEmail: res.newEmail
          });
          if (this.props.change) {
            this.props.change(res.newEmail);
          }
        } else
          switch (res.error) {
            case "Email":
              this.setState({
                changeEmailRes: {
                  text: changeEmail[this.mainContext.language].result.Email,
                  color: errorColor
                }
              });
              break;
            case "Authorization":
              this.setState({
                changeEmailRes: {
                  text: changeEmail[this.mainContext.language].result.Auth,
                  color: errorColor
                }
              });
              break;
            case "ConfirmationMail":
              this.setState({
                changeEmailRes: {
                  text:
                    changeEmail[this.mainContext.language].result
                      .ConfirmationMail,
                  color: errorColor
                }
              });
              break;
            default:
              this.setState({
                changeEmailRes: {
                  text: changeEmail[this.mainContext.language].result.Server,
                  color: errorColor
                }
              });
          }
      })
      .catch(err => {
        this.setState({
          changeEmailRes: {
            text: changeEmail[this.mainContext.language].result.Server,
            color: errorColor
          }
        });
      });
  };

  onChange = e => {
    if (e.target.id === "Email") {
      if (validate("Email", e.target.value) !== true) {
        this.setState({ emailError: true, newEmail: e.target.value });
      } else {
        this.setState({ emailError: false, newEmail: e.target.value });
      }
    } else {
      this.setState({ Password: e.target.value });
    }
  };

  render() {
    const text = changeEmail[this.mainContext.language];
    const EmailError = () => {
      if (this.state.emailError) {
        return <span style={{ color: errorColor }}>{text.error}</span>;
      }
      return "";
    };
    return (
      <div id="changeEmail">
        <form noValidate onSubmit={this.submit}>
          <FormControl>
            <TextField
              required
              type="email"
              id="Email"
              autoComplete="email"
              label="New Email"
              onChange={this.onChange}
              helperText={EmailError()}
            />
            <TextField
              required
              type="password"
              autoComplete="current-password"
              id="Password"
              label="Password"
              onChange={this.onChange}
            />
            <p style={{ color: this.state.changeEmailRes.color }}>
              {this.state.changeEmailRes.text}
            </p>
            <Button
              disabled={this.state.emailError}
              style={{ marginTop: "1.5em" }}
              color="primary"
              variant="contained"
              type="submit"
            >
              {text.button}
            </Button>
          </FormControl>
        </form>
      </div>
    );
  }
}

export default withContexts({ mainContext, fetchContext }, ChangeEmail);
