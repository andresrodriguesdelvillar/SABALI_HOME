import React, { Component } from "react";

// SubComponents
import Nav from "../SubComponents/Nav";
import HomeBackground from "./subComponents/background";

class Home extends Component {
  render() {
    return (
      <div id="Home" style={{ height: `100%` }}>
        {this.props.noNav ? null : (
          <Nav absolute include={["ClientMenu", "ContactLink"]} />
        )}
        <HomeBackground />
      </div>
    );
  }
}

export default Home;
