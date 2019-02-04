import React, { Component } from "react";

import { FormControl, TextField, Button } from "@material-ui/core";

// subComponents
import Nav from "../../SubComponents/Nav";
import ResendEmail from "../../SubComponents/ResendEmail";

// context
import { withContext } from "../../../custom/withContext";
import { mainContext, fetchContext } from "../../../contexts/contexts";

// custom imports
import { login } from "../../../custom/language";
import { validate } from "../../../../../customFuncs/validation";
import { errorColor } from "../../../custom/colors";
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
    if (this.context.loggedIn) {
      this.props.history.push("/");
    }
    const email = queryString(this.props.location.search.substring(1)).email;
    if (email) {
      this.setState({ Email: email, disable_submit: false });
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

  render() {
    const formInputs = login[this.context.language];
    const Submit = e => {
      e.preventDefault();
      const body = {
        Email: this.state.Email,
        Password: this.state.Password
      };
      this.props.context
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
            localStorage.setItem("userToken", res.token);
            this.context.handleUserAuth();
            this.props.history.push("/");
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
        <Nav include={["LanguageSelect"]} />
        <div className="container">
          <h1>{formInputs.title}</h1>
          <form noValidate onSubmit={Submit}>
            <FormControl fullWidth>
              <TextField
                label={formInputs.Email.label}
                helperText={printEmailErrors()}
                id="Email"
                type="email"
                autoComplete="email"
                value={this.state.Email}
                required
                onChange={this.onChange}
              />
              <TextField
                label={formInputs.Password.label}
                id="Password"
                type="password"
                autoComplete="current-password"
                required
                onChange={this.onChange}
              />
              <p style={{ color: errorColor, marginTop: "1.5em" }}>
                {this.state.loginError}
              </p>
              {this.state.resendConfMail ? (
                <ResendEmail Email={this.state.Email} />
              ) : (
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
              )}
            </FormControl>
          </form>
        </div>
      </div>
    );
  }
}

Login.contextType = mainContext;

export default withContext(fetchContext, Login);
