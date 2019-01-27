// general imports
import React, { Component } from "react";

import { FormControl, TextField, Button } from "@material-ui/core";

// style
import "./style.scss";

//custom Imports
import { register } from "../../../custom/language";
import { errorColor } from "../../../custom/colors";
import { validate } from "../../../../../customFuncs/validation";

//context
import { mainContext } from "../../../contexts/mainContext";

// Components
import Nav from "../../SubComponents/Nav";

class Register extends Component {
  state = {
    formInputName: "",
    formInputCompany: "",
    formInputEmail: "",
    formInputPassword: "",
    formInputConfPass: "",
    NameErrors: {
      length: false,
      symbols: false
    },
    CompanyErrors: {
      symbols: false
    },
    EmailErrors: {
      valid: false
    },
    PasswordErrors: {
      length: false,
      uppercase: false,
      symbol: false
    },
    ConfPassErrors: {
      match: false
    },
    disable_submit: false,
    registrationError: ""
  };

  Submit = e => {
    e.preventDefault();
    this.setState({ disable_submit: true });
    const formData = {
      Email: this.state.formInputEmail,
      Password: this.state.formInputPassword,
      PasswordConf: this.state.formInputConfPass,
      Name: this.state.formInputName,
      Company: this.state.formInputCompany,
      Language: this.context.language
    };
    this.context.fetch
      .post(formData, "/user/register")
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.history.push("/confirmemail?" + res.token);
        } else if (res.error) {
          this.handleRegistrationError(res.error);
        } else {
          this.setState({
            registrationError:
              register[this.context.language].registrationErrors.Server,
            disable_submit: false
          });
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({
          registrationError:
            register[this.context.language].registrationErrors.Server,
          disable_submit: false
        });
      });
  };

  handleRegistrationError = err => {
    if (err === "Email") {
      this.setState({
        registrationError:
          register[this.context.language].registrationErrors.Email,
        disable_submit: false
      });
    }
  };

  onChange = e => {
    e.preventDefault();
    const formInputToChange = "formInput" + e.target.id;
    this.setState({
      [formInputToChange]: e.target.value
    });
    if (e.target.id !== "ConfPass") {
      var validation = validate(e.target.id, e.target.value);
    } else {
      var validation = validate(
        "ConfPass",
        e.target.value,
        this.state.formInputPassword
      );
    }
    const errorType = e.target.id + "Errors";
    const errorState = { ...this.state[errorType] };
    if (validation !== true) {
      for (let i in validation) {
        errorState[validation[i]] = true;
      }
      this.setState({ [errorType]: errorState });
    } else {
      for (let error in errorState) {
        errorState[error] = false;
      }
      this.setState({ [errorType]: errorState });
    }
  };

  handle_Submit_disabling = () => {
    const toCheck = [
      "NameErrors",
      "CompanyErrors",
      "EmailErrors",
      "PasswordErrors",
      "ConfPassErrors"
    ];
    for (let i in toCheck) {
      for (let error in this.state[toCheck[i]]) {
        if (this.state[toCheck[i]][error]) {
          return true;
        }
      }
    }
    if (
      this.state.formInputEmail === "" ||
      this.state.formInputPassword === "" ||
      this.state.formInputConfPass === "" ||
      this.state.disable_submit
    ) {
      return true;
    }
    return false;
  };

  render() {
    const formLabels = register[this.context.language];
    // ____ERROR display____

    const printError = type => {
      const to_return = [];
      const string = type + "Errors";
      for (let error in this.state[string]) {
        if (this.state[string][error]) {
          to_return.push(
            <span style={{ color: errorColor }} key={error + 0}>
              {formLabels[type].errors[error]}
            </span>
          );
          to_return.push(<br key={error + 1} />);
        }
      }
      to_return.pop();
      return to_return.length === 0 ? "" : to_return;
    };

    return (
      <div id="register">
        <Nav />
        <div className="container">
          <h1>{formLabels.title}</h1>
          <form noValidate onSubmit={this.Submit}>
            <FormControl fullWidth>
              <TextField
                helperText={printError("Name")}
                id="Name"
                label={formLabels.Name.label}
                onChange={this.onChange}
              />
              <TextField
                helperText={printError("Company")}
                id="Company"
                label={formLabels.Company.label}
                onChange={this.onChange}
              />
              <TextField
                helperText={printError("Email")}
                required
                type="email"
                id="Email"
                autoComplete="email"
                label={formLabels.Email.label}
                onChange={this.onChange}
              />
              <TextField
                helperText={printError("Password")}
                required
                type="password"
                id="Password"
                label={formLabels.Password.label}
                onChange={this.onChange}
              />
              <TextField
                required
                helperText={printError("ConfPass")}
                type="password"
                id="ConfPass"
                label={formLabels.ConfPass.label}
                onChange={this.onChange}
              />
              <p style={{ color: errorColor, marginTop: "1.5em" }}>
                {this.state.registrationError}
              </p>
              <Button
                style={{ margin: "1.85em auto" }}
                type="submit"
                className="submitButton"
                variant="contained"
                color="primary"
                disabled={this.handle_Submit_disabling()}
              >
                {formLabels.submitButton}
              </Button>
            </FormControl>
          </form>
        </div>
      </div>
    );
  }
}

Register.contextType = mainContext;

export default Register;
