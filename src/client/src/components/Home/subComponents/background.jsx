import React, { Component } from "react";

import "./sub.scss";

const img1 = require("../assets/5.buttons.png");
const img2 = require("../assets/4.wolk.png");
const img3 = require("../assets/2.zon.png");
const img4 = require("../assets/3.aarde.png");

class Background extends Component {
  state = {};

  mouseEnter = e => {
    const layers = {
      layer2: [-8, -4.5],
      layer3: [-16, -9],
      layer4: [-32, -18]
    };

    for (let layer in layers) {
      document.getElementById(layer).style.transform = `translate(${(e.clientX *
        layers[layer][0]) /
        window.innerWidth}px, ${(e.clientY * layers[layer][1]) /
        window.innerHeight}px)`;
    }
  };
  render() {
    return (
      <div
        id="Background"
        name="Background"
        onMouseMove={this.mouseEnter.bind(this)}
      >
        <div id="layer1">
          <img src={img1} />
        </div>
        <div id="layer2">
          <img src={img2} />
        </div>
        <div id="layer3">
          <img src={img3} />
        </div>
        <div id="layer4">
          <img src={img4} />
        </div>
      </div>
    );
  }
}

export default Background;
