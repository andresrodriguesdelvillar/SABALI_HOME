import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

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
    popup: false,
    enter: true,
    exit: true
  };
  componentWillMount() {
    document.addEventListener("PopUp", this.handlePopUp, false);
  }

  handlePopUp = e => {
    console.log(e.popupType);
    this.setState({ popup: e.popupType });
  };

  render() {
    return (
      <Router>
        <div className="App">
          {this.state.popup ? <PopUps popup={this.state.popup} /> : null}

          <AnimatedRoute />

          <Switch>
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/confirmemail" component={ConfirmEmail} />
            <Route path="/confirmemailerror" component={ConfirmEmailError} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
