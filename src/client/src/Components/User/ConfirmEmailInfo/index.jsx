import React, { Component } from "react";

import { TextField, Button, FormControl } from "@material-ui/core";
import jwt from "jsonwebtoken";

// subComponents
import Nav from "../../SubComponents/Nav";
import Timer from "../../SubComponents/Timer";

// Style
import "./style.scss";

// context
import { mainContext } from "../../../contexts/mainContext";

// custom imports
import { confirmEmailInfo } from "../../../custom/language";
import { validate } from "../../../../../customFuncs/validation";
import { successColor, errorColor } from "../../../custom/colors";

class ConfirmEmailInfo extends Component {
  state = {
    userInfo: {},
    newEmail: "",
    password: "",
    text: {},
    emailError: true,
    changeEmailRes: "",
    resendEmailMessage: ""
  };

  componentWillMount() {
    const token = this.props.location.search.substring(1);
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        this.props.history.push("/register");
      } else {
        this.setState({ userInfo: decoded });
      }
    });
  }

  submit_newEmail = e => {
    e.preventDefault();
    const data = {
      newEmail: this.state.newEmail,
      oldEmail: this.state.userInfo.Email,
      Password: this.state.password,
      Language: this.context.language
    };
    this.context.fetch
      .post(data, "/user/changeemail")
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({
            changeEmailRes: {
              text:
                confirmEmailInfo[this.context.language].changeEmail.result
                  .success,
              color: successColor
            }
          });
        } else
          switch (res.error) {
            case "Email":
              this.setState({
                changeEmailRes: {
                  text:
                    confirmEmailInfo[this.context.language].changeEmail.result
                      .Email,
                  color: errorColor
                }
              });
              break;
            case "Authorization":
              this.setState({
                changeEmailRes: {
                  text:
                    confirmEmailInfo[this.context.language].changeEmail.result
                      .Auth,
                  color: errorColor
                }
              });
              break;
            case "ConfirmationMail":
              this.setState({
                changeEmailRes: {
                  text:
                    confirmEmailInfo[this.context.language].changeEmail.result
                      .ConfirmationMail,
                  color: errorColor
                }
              });
              break;
            default:
              this.setState({
                changeEmailRes: {
                  text:
                    confirmEmailInfo[this.context.language].changeEmail.result
                      .Server,
                  color: errorColor
                }
              });
          }
      })
      .catch(err => {
        this.setState({
          changeEmailRes: {
            text:
              confirmEmailInfo[this.context.language].changeEmail.result.Server,
            color: errorColor
          }
        });
      });
  };
  resendEmail = () => {
    const body = {
      Email: this.state.userInfo.Email,
      Language: this.context.language
    };
    this.context.fetch
      .post(body, "/user/resendemail")
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({
            resendEmailMessage: {
              text:
                confirmEmailInfo[this.context.language].resend.messages.success,
              color: successColor
            }
          });
        } else {
          this.setState({
            resendEmailMessage: {
              text:
                confirmEmailInfo[this.context.language].resend.messages.error,
              color: errorColor
            }
          });
        }
      })
      .catch(err => {
        this.setState({
          resendEmailMessage: {
            text: confirmEmailInfo[this.context.language].resend.messages.error,
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
      this.setState({ password: e.target.value });
    }
  };

  render() {
    const text = confirmEmailInfo[this.context.language];
    const EmailError = () => {
      if (this.state.emailError) {
        return (
          <span style={{ color: errorColor }}>{text.changeEmail.error}</span>
        );
      }
      return "";
    };
    return (
      <div id="confirmEmail">
        <Nav />
        <div className="container">
          <div id="confirmEmailInfo">
            <h3>
              {text.main} {this.state.userInfo.Email}
            </h3>

            <Timer
              expires={this.state.userInfo.exp ? this.state.userInfo.exp : 0}
            />
            <h4>{text.resend.text}</h4>
            <div id="resendEmail" onClick={this.resendEmail}>
              <Button color="primary" variant="contained">
                {text.resend.button}
              </Button>
            </div>
            <p style={{ color: this.state.resendEmailMessage.color }}>
              {this.state.resendEmailMessage.text}
            </p>

            <form noValidate onSubmit={this.submit_newEmail}>
              <h4>{text.changeEmail.text}</h4>
              <FormControl>
                <TextField
                  style={{ marginTop: "1.5em" }}
                  required
                  type="email"
                  id="Email"
                  label="New Email"
                  onChange={this.onChange}
                  helperText={EmailError()}
                />
                <TextField
                  required
                  type="password"
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
                  {text.changeEmail.button}
                </Button>
              </FormControl>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

ConfirmEmailInfo.contextType = mainContext;

export default ConfirmEmailInfo;
