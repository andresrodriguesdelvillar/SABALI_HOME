import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "./App.scss";

import Home from "./Home";
import LatestWork from "./LatestWork";
import Admin from "./Admin";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Route exact path="/Latestwork/" component={LatestWork} />
          <Route exact path="/admin/" component={Admin} />
          <Route exact path="/" component={Home} />
        </div>
      </Router>
    );
  }
}

export default App;
