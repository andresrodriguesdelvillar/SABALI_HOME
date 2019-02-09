import React, { Component } from "react";

// SubComponents

import HomeBackground from "./subComponents/background";

class Home extends Component {
  render() {
    return (
      <div id="Home" style={{ height: `${window.innerHeight}px` }}>
        <HomeBackground />
      </div>
    );
  }
}

export default Home;
