import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { isMobile } from "react-device-detect";

// context
import mainContext from "../contexts/mainContext";

// custom functions

import "./App.scss";

import Home from "./Home";
//const Register = React.lazy(() => import("./Register"));
import Register from "./Register";

class App extends Component {
  state = {
    userLocation: "USA"
  };
  componentDidMount() {
    this.context.isMobile = isMobile;

    this.userLocation()
      .then(response => {
        this.context.user.location = response.country;
        if (response.languages === "de") {
          this.context.user.language = "de";
        } else if (response.languages === "nl") {
          this.context.user.language = "nl";
        } else if (response.languages === "es") {
          this.context.user.language = "es";
        } else {
          this.context.user.language = "en";
        }
      })
      .catch(() => {
        this.context.user.location = "USA";
        this.context.user.language = "en";
      });
  }

  userLocation = () => {
    return fetch("https://ipapi.co/json").then(res => res.json());
  };

  render() {
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/register" exact component={Register} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.contextType = mainContext;

export default App;
