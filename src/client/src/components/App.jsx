import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import mainContext from "../contexts/mainContext";
import { userLocation } from "../customFuncs/main";
import { isMobile } from "react-device-detect";
import "./App.scss";

import Home from "./Home";
import LatestWork from "./LatestWork";
import Admin from "./Admin";

class App extends Component {
  state = {
    userLocation: "USA"
  };
  componentWillMount() {
    this.context.mobile = isMobile;
    this.userLocation();
  }

  userLocation = () => {
    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(response => {
        this.setState({ userLocation: response.country });
        console.log(response);
      })
      .catch(() => {
        this.setState({ userLocation: "USA" });
      });
  };

  render() {
    this.context.userLocation = this.state.userLocation;
    return (
      <Router>
        <div className="App">
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/latestwork/" exact component={LatestWork} />
            <Route path="/admin/" exact component={Admin} />
          </Switch>
        </div>
      </Router>
    );
  }
}

App.contextType = mainContext;

export default App;
