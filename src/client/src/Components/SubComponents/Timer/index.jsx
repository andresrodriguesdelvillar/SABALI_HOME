import React, { Component } from "react";

class Timer extends Component {
  state = {
    time: 0
  };

  componentWillMount() {
    this.interval = setInterval(() => {
      let TimeInMs = this.props.expires * 1000 - Date.now();
      this.setState({
        time: new Date(TimeInMs).toISOString().slice(14, -5),
        TimeInMs: TimeInMs
      });
      if (TimeInMs < 1000) {
        this.setState({ time: new Date(0).toISOString().slice(14, -5) });
        clearInterval(this.interval);
      }
    }, this.state.TimeInMs % 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div id="Timer">
        <h4>
          {this.props.text._1}
          <span style={{ fontWeight: "bold" }}>{this.state.time}</span>
          {this.props.text._2}
        </h4>
      </div>
    );
  }
}

export default Timer;
