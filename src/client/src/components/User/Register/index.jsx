// general imports
import React, { Component } from "react";

import { FormControl, TextField, Button, Select } from "@material-ui/core";

// style
import "./style.scss";

//custom Imports
import { register } from "../../../custom/language";
import {
  validateEmail,
  validatePassword,
  validateConfPass,
  validateName,
  validateCompany
} from "../../../../../customFuncs/validation";

//context
import mainContext from "../../../contexts/mainContext";

class Register extends Component {
  state = {
    formInputName: "",
    formInputCompany: "",
    formInputEmail: "",
    formInputPassword: "",
    formInputConfPass: "",
    form: {},
    nameErrors: {
      length: false,
      symbols: false
    },
    companyErrors: {
      symbols: false
    },
    emailErrors: {
      valid: false
    },
    passwordErrors: {
      length: false,
      uppercase: false,
      symbol: false
    },
    confPassErrors: {
      match: false
    }
  };

  componentWillMount() {
    if (this.context.user.language === "de") {
      this.setState({ form: register.de });
    } else if (this.context.user.language === "nl") {
      this.setState({ form: register.nl });
    } else if (this.context.user.language === "es") {
      this.setState({ form: register.es });
    } else {
      this.setState({ form: register.en });
    }
  }

  Submit = e => {
    e.preventDefault();
    const formData = {
      Email: this.state.formInputEmail,
      Password: this.state.formInputPassword,
      PasswordConf: this.state.formInputConfPass,
      Name: this.state.formInputName,
      Company: this.state.formInputCompany
    };
    this.context.fetch
      .register(formData)
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          this.props.history.push("/confirmemail?" + res.token);
        }
      })
      .catch(err => console.log(err));
  };

  onChange = e => {
    e.preventDefault();
    const formInputToChange = "formInput" + e.target.id;
    this.setState({
      [formInputToChange]: e.target.value
    });
    // Name
    if (e.target.id === "Name") {
      const validation = validateName(e.target.value);
      if (validation !== true) {
        const errorState = {
          length: false,
          symbol: false
        };
        for (let i in validation) {
          errorState[validation[i]] = true;
        }
        this.setState({ nameErrors: errorState });
      } else {
        this.setState({ nameErrors: { length: false, symbols: false } });
      }
    }
    // Company
    else if (e.target.id === "Company") {
      const validation = validateCompany(e.target.value);
      if (validation !== true) {
        const errorState = {
          symbol: false
        };
        for (let i in validation) {
          errorState[validation[i]] = true;
        }
        this.setState({ companyErrors: errorState });
      } else {
        this.setState({ companyErrors: { symbols: false } });
      }
    }
    // Email
    else if (e.target.id === "Email") {
      const validation = validateEmail(e.target.value);
      if (validation !== true) {
        this.setState({ emailErrors: { valid: true } });
      } else {
        this.setState({ emailErrors: { valid: false } });
      }
    }
    // Password
    else if (e.target.id === "Password") {
      const validation = validatePassword(e.target.value);
      if (validation !== true) {
        const errorState = {
          length: false,
          symbol: false,
          uppercase: false
        };
        for (let i in validation) {
          errorState[validation[i]] = true;
        }
        this.setState({ passwordErrors: errorState });
      } else {
        this.setState({
          passwordErrors: { length: false, symbol: false, uppercase: false }
        });
      }
    }
    // Password confirmation
    else if (e.target.id === "ConfPass") {
      const validation = validateConfPass(
        this.state.formInputPassword,
        e.target.value
      );
      if (validation !== true) {
        this.setState({ confPassErrors: { match: true } });
      } else {
        this.setState({
          confPassErrors: { match: false }
        });
      }
    }
  };

  changeLang = e => {
    this.setState({ form: register[e.target.value] });
    this.context.user.language = e.target.value;
  };

  disable_submit_button = e => {
    console.log(e);
  };

  handle_Submit_disabling = () => {
    const toCheck = [
      "nameErrors",
      "companyErrors",
      "emailErrors",
      "passwordErrors",
      "confPassErrors"
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
      this.state.formInputConfPass === ""
    ) {
      return true;
    }
    return false;
  };

  render() {
    const formLabels = this.state.form;
    // ____ERROR display____

    const printError = type => {
      const to_return = [];
      const string = type + "Errors";
      for (let error in this.state[string]) {
        if (this.state[string][error]) {
          to_return.push(
            <span style={{ color: "#FF9494" }} key={error + 0}>
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
        <div className="container">
          <Select
            value={this.context.user.language}
            name="language"
            id="language"
            style={{ float: "right", display: "box" }}
            onChange={this.changeLang}
            native={true}
            fullWidth={false}
          >
            <option value="en">english</option>
            <option value="de">deutsch</option>
            <option value="es">español</option>
            <option value="nl">nederlands</option>
          </Select>
          <h1>{formLabels.title}</h1>

          <form noValidate onSubmit={this.Submit}>
            <FormControl fullWidth>
              <TextField
                helperText={printError("name")}
                id="Name"
                label={formLabels.name.label ? formLabels.name.label : "Name"}
                onChange={this.onChange}
              />
              <TextField
                helperText={printError("company")}
                id="Company"
                label={formLabels.company.label}
                onChange={this.onChange}
              />
              <TextField
                helperText={printError("email")}
                required
                type="email"
                id="Email"
                label={formLabels.email.label}
                onChange={this.onChange}
              />
              <TextField
                helperText={printError("password")}
                required
                type="password"
                id="Password"
                label={formLabels.password.label}
                onChange={this.onChange}
              />
              <TextField
                required
                helperText={printError("confPass")}
                type="password"
                id="ConfPass"
                label={formLabels.confPass.label}
                onChange={this.onChange}
              />
              <Button
                type="submit"
                id="register_submit"
                variant="contained"
                color="primary"
                disabled={this.handle_Submit_disabling()}
              >
                {formLabels.submitButton ? formLabels.submitButton : "Register"}
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
