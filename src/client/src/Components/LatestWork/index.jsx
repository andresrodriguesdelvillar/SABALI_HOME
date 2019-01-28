import React, { Component } from "react";

import "./style.scss";

class LatestWork extends Component {
  state = {
    tilt: {}
  };
  componentWillMount() {
    if (this.isMobileDevice()) {
      window.addEventListener(
        "deviceorientation",
        this.handleOrientation,
        true
      );
    }
  }
  isMobileDevice = () => {
    return (
      typeof window.orientation !== "undefined" ||
      navigator.userAgent.indexOf("IEMobile") !== -1
    );
  };

  handleOrientation = event => {
    const alpha = event.alpha;
    const beta = event.beta;
    const gamma = event.gamma;

    // JS math works in radians
    var betaR = (beta / 180) * Math.PI;
    var gammaR = (gamma / 180) * Math.PI;
    var spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));

    // convert back to degrees
    var spin = (spinR * 180) / Math.PI;

    const tilt_left = (gammaR / (Math.pi / 2)) * 100;
    console.log(Math.pi);

    this.setState({
      tilt: {
        alpha: alpha.toString(),
        beta: beta.toString(),
        gamma: gamma.toString(),
        betaR: betaR.toString(),
        gammaR: gammaR.toString(),
        spinR: spinR.toString(),
        spin: spin.toString(),
        tilt_left: tilt_left.toString()
      }
    });
  };
  show = () => {
    if (this.state.tilt.length > 0) {
      this.state.tilt.map(({ value, i }) => {
        console.log(value, i);
        return <h1 key={i}>{value}</h1>;
      });
    } else {
      return <h1>no tilt</h1>;
    }
  };
  showOne = item => {
    if (this.state.tilt[item]) {
      return (
        <h1>
          {item}: {this.state.tilt[item]}
        </h1>
      );
    } else {
      return "no alpha";
    }
  };
  render() {
    return (
      <div id="latest work">
        {this.showOne("beta")}
        <br /> {this.showOne("gamma")}
        <br /> {this.showOne("betaR")}
        <br /> {this.showOne("gammaR")}
        <br /> {this.showOne("tilt_left")}
        <br /> {this.showOne("spin")}{" "}
      </div>
    );
  }
}

export default LatestWork;
