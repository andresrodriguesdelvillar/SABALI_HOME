import React, { Component } from "react";

// custom imports
import { queryString } from "../../../custom/helpers";

// subComponents
import Nav from "../../SubComponents/Nav";

class ResetPassword extends Component {
  state = {
    Email: ""
  };
  componentDidMount() {
    this.setState(queryString(this.props.location.search.substring(1)));
  }
  Submit = () => {};
  render() {
    return (
      <div id="resetPassword">
        <Nav include={["LanguageSelect"]} />
        <div className="container">
          We have sent ...
          <form noValidate onSubmit={this.Submit}>
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

export default ResetPassword;
