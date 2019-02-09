import React, { Component } from "react";

import anime from "animejs";

// context
import { mainContext } from "../../contexts/contexts";

// components
import Nav from "../SubComponents/Nav";
import Home from "../Home";
import Contact from "../Contact";

const animateTransition = () => {
  anime({
    targets: "#transitioning",
    duration: 5000,
    easing: "linear",
    translateY: window.innerHeight
  });
  anime({
    targets: "#homeNav",
    duration: 5000,
    easing: "linear",
    opacity: [1, 0]
  });
  anime({
    targets: "#contactNav",
    duration: 5000,
    easing: "linear",
    opacity: [0, 1]
  });
};

class HomeContact extends Component {
  state = {
    toRender: "Home"
  };

  componentDidUpdate() {
    if (this.state.toRender === "Transition") {
      animateTransition();

      setTimeout(() => {
        window.history.pushState(null, "Contact", "/contact");
      }, this.timeout);
    }
  }

  timeout = 5000;

  handleTransition = () => {
    this.setState({ toRender: "Transition" });
  };

  render() {
    const { toRender } = this.state;

    const homeNav = (
      <Nav
        transition={this.handleTransition}
        absolute={true}
        wit={true}
        include={["ContactLink", "ClientMenu"]}
      />
    );

    const transitionNav = (
      <div style={{ width: "100%" }}>
        <div id="homeNav">
          <Nav
            transition={this.handleTransition}
            absolute={true}
            wit={true}
            include={["ContactLink", "ClientMenu"]}
          />
        </div>
        <div id="contactNav">
          <Nav absolute={true} include={["ClientMenu", "LanguageSelect"]} />
        </div>
      </div>
    );

    return (
      <div
        id="contactHome"
        style={{
          position: "absolute",
          overflow: "hidden",
          width: "100vw",
          height: "100vh"
        }}
      >
        {toRender === "Home"
          ? homeNav
          : toRender === "Transition"
          ? transitionNav
          : null}
        {toRender === "Home" ? (
          <Home />
        ) : toRender === "Transition" ? (
          <div id="transitioning">
            <div style={{ transform: `translateY(-99vh)` }}>
              <Contact noNav={true} />
            </div>
            <div>
              <Home />
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}

HomeContact.contextType = mainContext;

export default HomeContact;
