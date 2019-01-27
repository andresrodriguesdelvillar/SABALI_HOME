import React, { Component } from "react";

import { FormControl, TextField, Button } from "@material-ui/core";
import jwt from "jsonwebtoken";

// subComponents
import Nav from "../../SubComponents/Nav";
// context
import { mainContext } from "../../../contexts/mainContext";

// custom imports
import { login } from "../../../custom/language";
import { validate } from "../../../../../customFuncs/validation";
import { errorColor, successColor } from "../../../custom/colors";
import { queryString } from "../../../custom/helpers";

class Login extends Component {
  state = {
    Email: "",
    Password: "",
    emailError: false,
    disable_submit: true,
    loginError: "",
    resendConfMail: false,
    resendEmailMessage: { text: "", color: "" }
  };
  componentWillMount() {
    const email = queryString(this.props.location.search.substring(1)).email;
    if (email) {
      this.setState({ Email: email, disable_submit: false });
    }
  }
  componentDidUpdate() {
    if (this.state.resendConfMail) {
      document.getElementById("resendEmailLogin").style.display = "block";
      document.getElementById("SubmitLoginButton").style.display = "none";
    } else {
      document.getElementById("resendEmailLogin").style.display = "none";
    }
  }

  onChange = e => {
    if (this.state.resendConfMail) {
      document.getElementById("SubmitLoginButton").style.display = "block";
      this.setState({ resendConfMail: false });
    }
    if (e.target.id === "Email") {
      if (validate("Email", e.target.value) !== true) {
        this.setState({ emailError: true, [e.target.id]: e.target.value });
      } else {
        this.setState({
          disable_submit: false,
          emailError: false,
          [e.target.id]: e.target.value
        });
      }
    } else {
      this.setState({ [e.target.id]: e.target.value });
    }
  };
  handle_submitDisabling = () => {
    if (this.state.disable_submit || this.state.emailError) {
      return true;
    }
    return false;
  };
  resendEmail = () => {
    const body = {
      Email: this.state.Email,
      Language: this.context.language
    };
    this.context.fetch
      .post(body, "/user/resendemail")
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.setState({
            resendEmailMessage: {
              text: login[this.context.language].resend.messages.success,
              color: successColor
            }
          });
        } else {
          this.setState({
            resendEmailMessage: {
              text: login[this.context.language].resend.messages.error,
              color: errorColor
            }
          });
        }
      })
      .catch(err => {
        this.setState({
          resendEmailMessage: {
            text: login[this.context.language].resend.messages.error,
            color: errorColor
          }
        });
      });
  };

  render() {
    const formInputs = login[this.context.language];
    const Submit = e => {
      e.preventDefault();
      const body = {
        Email: this.state.Email,
        Password: this.state.Password
      };
      this.context.fetch
        .post(body, "/user/login")
        .then(res => res.json())
        .then(res => {
          if (!res.success) {
            switch (res.error) {
              case "Email":
                this.setState({ loginError: formInputs.loginErrors.Email });
                break;
              case "Confirmed":
                this.setState({
                  loginError: formInputs.loginErrors.Confirmed,
                  resendConfMail: true
                });
                break;
              case "Password":
                this.setState({ loginError: formInputs.loginErrors.Password });
                break;
              default:
                this.setState({ loginError: formInputs.loginErrors.Server });
            }
          } else if (res.success && res.token) {
            localStorage.userToken = res.token;
            jwt.verify(res.token, process.env.SECRET_KEY, (err, decoded) => {
              if (err) {
                this.setState({ loginError: formInputs.loginErrors.Server });
              } else {
                this.context.update("user", {
                  loggedIn: true,
                  details: {
                    ID: decoded.ID,
                    Name: decoded.Name,
                    Company: decoded.Company,
                    Email: decoded.Email
                  }
                });
                this.props.history.push("/");
              }
            });
            console.log(this.context);
          } else {
            this.setState({ loginError: formInputs.loginErrors.Server });
          }
        });
    };
    const printEmailErrors = () => {
      if (this.state.emailError) {
        return (
          <span style={{ color: errorColor }}>
            {formInputs.Email.errors.valid}
          </span>
        );
      } else {
        return "";
      }
    };
    return (
      <div id="Login">
        <Nav />
        <div className="container">
          <h1>{formInputs.title}</h1>
          <form noValidate onSubmit={Submit}>
            <FormControl fullWidth>
              <TextField
                label={formInputs.Email.label}
                helperText={printEmailErrors()}
                id="Email"
                type="email"
                value={this.state.Email}
                required
                onChange={this.onChange}
              />
              <TextField
                label={formInputs.Password.label}
                id="Password"
                type="password"
                required
                onChange={this.onChange}
              />
              <p style={{ color: errorColor, marginTop: "1.5em" }}>
                {this.state.loginError}
              </p>
              <div
                id="resendEmailLogin"
                onClick={this.resendEmail}
                style={{ display: "none" }}
              >
                <Button color="primary" variant="contained">
                  {formInputs.resend.button}
                </Button>
                <p style={{ color: this.state.resendEmailMessage.color }}>
                  {this.state.resendEmailMessage.text}
                </p>
              </div>

              <Button
                style={{ margin: "1.75em auto" }}
                className="submitButton"
                id="SubmitLoginButton"
                variant="contained"
                color="primary"
                type="submit"
                disabled={this.handle_submitDisabling()}
              >
                {formInputs.submitButton}
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    );
  }
}

Login.contextType = mainContext;

export default Login;
