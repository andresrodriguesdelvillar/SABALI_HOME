import React, { Component } from "react";

import { CSSTransition } from "react-transition-group";

// SubComponents

import Background from "./subComponents/background";
import Nav from "../SubComponents/Nav";

// styles
import "./style.scss";

class Home extends Component {
  state = {
    appear: true
  };

  toggleAppear = () => {
    this.setState({ appear: !this.state.appear });
    this.props.history.push("/contact");
  };

  render() {
    return (
      <CSSTransition in={this.state.appear} timeout={5000} classNames="slide">
        <div
          id="Homecontainer"
          style={{
            position: "absolute",
            width: "100vw",
            height: "100vh"
          }}
        >
          <Nav absolute={true} include={["ClientMenu"]} />
          <button
            onClick={this.toggleAppear}
            style={{ margin: "15vh 0 0 45vw" }}
          >
            Appear
          </button>
          <Background />
        </div>
      </CSSTransition>
    );
  }
}

export default Home;
