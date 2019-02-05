import React, { Component } from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { CSSTransition } from "react-transition-group";

import Loadable from "react-loadable";
// style
import "./App.scss";

// Components
import Loading from "./Components/Loading";
const PopUps = Loadable({
  loader: () => import("./Components/SubComponents/PopUps"),
  loading: Loading
});
const Home = Loadable({
  loader: () => import("./Components/Home"),
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

const Contact = Loadable({
  loader: () => import("./Components/Contact"),
  loading: Loading
});

class App extends Component {
  state = {
    popup: false,
    appearHome: true
  };
  componentWillMount() {
    document.addEventListener("PopUp", this.newContentPopUp, { passive: true });
  }

  newContentPopUp = e => {
    console.log(e.popupType);
    this.setState({ popup: e.popupType });
  };

  render() {
    return (
      <Router>
        <div className="App">
          {this.state.popup ? <PopUps popup={this.state.popup} /> : null}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/contact" component={Contact} />
            <Route path="/register" exact component={Register} />
            <Route path="/login" exact component={Login} />
            <Route path="/confirmemail" exact component={ConfirmEmail} />
            <Route
              path="/confirmemailerror"
              exact
              component={ConfirmEmailError}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
