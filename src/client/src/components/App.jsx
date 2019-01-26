import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Loadable from "react-loadable";

// style
import "./App.scss";

// Components
import Loading from "./Loading";
const Home = Loadable({
  loader: () => import("./Home"),
  loading: Loading
});
const Register = Loadable({
  loader: () => import("./User/Register"),
  loading: Loading
});
const ConfirmEmail = Loadable({
  loader: () => import("./User/ConfirmEmailInfo"),
  loading: Loading
});
const ConfirmEmailError = Loadable({
  loader: () => import("./User/ConfirmEmailError"),
  loading: Loading
});
// const Login = Loadable({
//   loader: () => import("./User/Login/Login"),
//   loading: Loading
// });
import Login from "./User/Login";
class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
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
