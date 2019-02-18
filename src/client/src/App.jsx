import React, { Component } from "react";

import { Switch, Route, withRouter } from "react-router-dom";

import Loadable from "react-loadable";
// style
import "./App.scss";

// Components

import AnimatedRoute from "./Components/AnimatedRoute";

import Loading from "./Components/Loading";
const PopUps = Loadable({
  loader: () => import("./Components/SubComponents/PopUps"),
  loading: Loading
});
const Register = Loadable({
  loader: () => import("./Components/User/Register"),
  loading: Loading
});
const Login = Loadable({
  loader: () => import("./Components/User/Login"),
  loading: Loading
});
const ConfirmEmail = Loadable({
  loader: () => import("./Components/User/ConfirmEmailInfo"),
  loading: Loading
});
const ConfirmEmailError = Loadable({
  loader: () => import("./Components/User/ConfirmEmailError"),
  loading: Loading
});

class App extends Component {
  state = {
    popup: false
  };

  componentWillMount() {
    document.addEventListener("PopUp", this.handlePopUp, false);
  }

  handlePopUp = e => {
    this.setState({ popup: e.popupType });
  };

  render() {
    return (
      <div className="App" style={{ height: `100vh`, width: "100vw" }}>
        {this.state.popup ? <PopUps popup={this.state.popup} /> : null}
        {/* Handling transition */}
        {this.props.location.pathname === "/" ||
        this.props.location.pathname === "/contact" ? (
          <AnimatedRoute
            location={this.props.location}
            history={this.props.history}
          />
        ) : null}
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/confirmemail" component={ConfirmEmail} />
          <Route path="/confirmemailerror" component={ConfirmEmailError} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
