import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Loadable from "react-loadable";

// custom functions

import "./App.scss";

import Loading from "./Loading";
import Home from "./Home";
import ContextHelper from "../contexts/contextHelper";
// const Home = Loadable({
//   loader: () => import("./Home"),
//   loading: Loading
// });
const Register = Loadable({
  loader: () => import("./User/Register"),
  loading: Loading
});
const ConfirmEmail = Loadable({
  loader: () => import("./User/Stateless").ConfirmEmail,
  loading: Loading
});
//import Register from "./Register";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <ContextHelper />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
            <Route path="/confirmemail" exact component={ConfirmEmail} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
