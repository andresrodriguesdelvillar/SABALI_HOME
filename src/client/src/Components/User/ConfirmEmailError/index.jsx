import React, { Component } from "react";

// custom imports
import { confirmError } from "../../../custom/language";
import { queryString } from "../../../custom/helpers";

// context
import { mainContext } from "../../../contexts/contexts";

// subComponents
import ResendEmail from "../../SubComponents/ResendEmail";
import ChangeEmail from "../../SubComponents/ChangeEmail";
import Nav from "../../SubComponents/Nav";

class ConfirmError extends Component {
  state = {
    error: false,
    email: false
  };

  componentWillMount() {
    const query = queryString(this.props.location.search.substring(1));
    if (query.error && query.email) {
      this.setState({ error: query.error, email: query.email });
    } else {
      this.props.history.push("/");
    }
  }

  render() {
    const lang = confirmError[this.context.language];
    const tokenExpired = (
      <div id="tokenExpired">
        <h3>{lang.tokenExpired}</h3>
        <ResendEmail Email={this.state.email} />
      </div>
    );
    const emailError = (
      <div id="emailError">
        <h3>
          {lang.emailUnknown} {this.state.email}
        </h3>
        <ChangeEmail oldEmail={this.state.email} />
      </div>
    );
    return (
      <div id="ConfirmError">
        <Nav include={["LanguageSelect"]} />
        <div className="container">
          {this.state.error === "tokenExpired" ? tokenExpired : emailError}
        </div>
      </div>
    );
  }
}

ConfirmError.contextType = mainContext;

export default ConfirmError;
