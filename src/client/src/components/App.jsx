import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.scss";

import Home from "./Home";
import LatestWork from "./LatestWork";
import Admin from "./Admin";

class App extends Component {
  render() {
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

export default App;
