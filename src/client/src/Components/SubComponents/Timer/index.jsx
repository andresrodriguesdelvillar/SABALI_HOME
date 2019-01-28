import React, { Component } from "react";

class Timer extends Component {
  state = {
    time: 0
  };

  componentDidMount() {
    this.handleTimer(this.props.expires * 1000);
  }

  handleTimer = expires => {
    let TimeInMs = expires - Date.now();
    this.setState({ time: new Date(TimeInMs).toISOString().slice(14, -5) });
    const interval = setInterval(() => {
      if (TimeInMs < 1000) {
        this.setState({ time: new Date(0).toISOString().slice(14, -5) });
        clearInterval(interval);
      }
      TimeInMs = expires - Date.now();
      this.setState({ time: new Date(TimeInMs).toISOString().slice(14, -5) });
    }, TimeInMs % 1000);
  };

  render() {
    return <div id="Timer">{this.state.time}</div>;
  }
}

export default Timer;
