// general imports
import React, { Component } from "react";

import { FormControl, TextField, Button } from "@material-ui/core";

// style
import "./style.scss";

//custom Imports
import { register } from "../../custom/language";
import {
  validateEmail,
  validatePassword,
  validateConfPass,
  validateName,
  validateCompany
} from "../../../../customFuncs/validation";

import { nameErrors, companyErrors } from "../../custom/registerErrorTexts";

//context
import mainContext from "../../contexts/mainContext";

class Register extends Component {
  state = {
    formInputs: {
      Name: "",
      Company: "",
      Email: "",
      Password: "",
      Confpass: ""
    },
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
      this.setState({ form: register.deutsch });
    } else if (this.context.user.language === "nl") {
      this.setState({ form: register.nederlands });
    } else if (this.context.user.language === "es") {
      this.setState({ form: register.espanol });
    } else {
      this.setState({ form: register.english });
    }
  }

  Submit = () => {
    console.log(this.state);
  };

  onChange = e => {
    e.preventDefault();
    this.setState({
      formInputs: { ...this.state.formInputs, [e.target.id]: e.target.value }
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
        this.setState({
          nameErrors: { nameErrors: { length: false, symbols: false } }
        });
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
        this.setState({
          companyErrors: { companyErrors: { symbols: false } }
        });
      }
    }
    // Email
    else if (e.target.id === "Email") {
      const validation = validateEmail(e.target.value);
      if (validation !== true) {
        this.setState({ emailErrors: { valid: true } });
      } else {
        this.setState({
          emailErrors: { emailErrors: { valid: false } }
        });
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
          passwordErrors: {
            passwordErrors: { length: false, symbol: false, uppercase: false }
          }
        });
      }
    }
    // Password confirmation
    else if (e.target.id === "ConfPass") {
      const validation = validateConfPass(
        this.state.formInputs.Password,
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

  render() {
    const formLabels = this.state.form;
    const nameErrors = () => {
      let to_return = [];
      for (let error in this.state.nameErrors) {
        if (this.state.nameErrors[error] === true) {
          to_return.push(
            <span key={error + 0}>{formLabels.name.errors[error]}</span>
          );
          to_return.push(<br key={error + 1} />);
        }
      }
      to_return.pop();
      return to_return.length === 0 ? "" : to_return;
    };
    const companyErrors = () => {
      if (this.state.companyErrors.symbols) {
        return formLabels.company.errors.symbols;
      } else {
        return "";
      }
    };
    const emailErrors = () => {
      if (this.state.emailErrors.valid) {
        return formLabels.email.errors.default;
      } else {
        return "";
      }
    };
    const passwordErrors = () => {
      let to_return = [];
      for (let error in this.state.passwordErrors) {
        if (this.state.passwordErrors[error] === true) {
          to_return.push(
            <span key={error + 0}>{formLabels.password.errors[error]}</span>
          );
          to_return.push(<br key={error + 1} />);
        }
      }
      to_return.pop();
      return to_return.length === 0 ? "" : to_return;
    };
    const confPassErrors = () => {
      if (this.state.confPassErrors.match) {
        return formLabels.confPass.errors.default;
      } else {
        return "";
      }
    };
    return (
      <div id="register">
        <div className="container">
          <h1>{formLabels.title}</h1>
          <form noValidate>
            <FormControl fullWidth>
              <TextField
                helperText={nameErrors()}
                id="Name"
                label={formLabels.name.label ? formLabels.name.label : "Name"}
                onChange={this.onChange}
              />
              <TextField
                helperText={companyErrors()}
                id="Company"
                label={formLabels.company.label}
                onChange={this.onChange}
              />
              <TextField
                helperText={emailErrors()}
                required
                id="Email"
                label={formLabels.email.label}
                onChange={this.onChange}
              />
              <TextField
                helperText={passwordErrors()}
                required
                id="Password"
                label={formLabels.password.label}
                onChange={this.onChange}
              />
              <TextField
                required
                helperText={confPassErrors()}
                id="ConfPass"
                label={formLabels.confPass.label}
                onChange={this.onChange}
              />
              <Button
                type="submit"
                id="register_submit"
                variant="contained"
                color="primary"
                onClick={this.Submit}
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
