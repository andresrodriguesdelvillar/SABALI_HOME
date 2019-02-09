import React, { Component } from "react";

import anime from "animejs";
import { generate } from "shortid";

import "./style.scss";

const generalClass = generate();

export class DropDown extends Component {
  state = {
    open: false,
    button_ID: ""
  };

  animationDuration = 1000;

  componentWillMount() {
    this.setState({ button_ID: generate() });
    document.addEventListener("mouseup", this.handleOutsiteClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleOutsiteClick, true);
  }

  handleOutsiteClick = e => {
    e.preventDefault();
    const wrapper = document.getElementById(this.state.button_ID);

    if (!wrapper.contains(e.target) && this.state.open) {
      this.animateMenuOut();
      setTimeout(() => {
        this.setState({ open: false });
      }, this.animationDuration);
    }
  };

  componentDidUpdate() {
    if (this.state.open) {
      console.log("should animate");
      this.animateMenuIn();
    }
  }

  animateMenuIn = () => {
    console.log(this.props.children[1].props.children.length * 100);
    anime({
      targets: `.${generalClass}`,
      duration: this.animationDuration,
      easing: "spring(10, 60, 70, 7)",
      elasticity: 300,
      delay: anime.stagger(50, { direction: "reverse" }),
      translateY: [
        anime.stagger([
          "-100%",
          `-${this.props.children[1].props.children.length * 100}%`
        ]),
        0
      ]
    });
  };

  animateMenuOut = () => {
    anime({
      targets: `.${generalClass}`,
      duration: this.animationDuration,
      elasticity: 300,
      easing: "linear",
      delay: anime.stagger(50),
      translateY: [
        0,
        anime.stagger([
          "-100%",
          `-${this.props.children[1].props.children.length * 100}%`
        ])
      ]
    });
  };

  toggle = e => {
    e.preventDefault();
    if (this.state.open) {
      this.animateMenuOut();
      setTimeout(() => {
        this.setState({ open: false });
      }, this.animationDuration);
    } else {
      this.setState({ open: true });
    }
  };

  handleClose = e => {
    if (e.target.parentNode.tagName !== "A") {
      this.setState({ open: false });
    }
  };
  render() {
    return (
      <div className="dropdown" id={this.state.button_ID}>
        <div onClick={this.toggle}>{this.props.children[0]}</div>
        <div onClick={this.handleClose}>
          {this.state.open ? this.props.children[1] : null}
        </div>
      </div>
    );
  }
}

export default DropDown;

export const DropDownMenu = props => {
  const styles = {
    cursor: "pointer",
    width: "80%",
    margin: "0 auto",
    marginTop: "0.5em"
  };
  return (
    <div {...props} style={styles}>
      {props.children}
    </div>
  );
};

const styles = {
  cursor: "pointer",
  backgroundColor: "transparent",
  border: "none",
  outline: "none"
};

export const DropDownButton = props => {
  const clickDuration = 200;

  const animateClick = el => {
    anime({
      targets: el,
      duration: clickDuration,
      easing: "spring(10, 60, 70, 7)",
      scale: [1, 1.1, 1]
    });
  };

  const onClick = e => {
    animateClick(`#${e.target.id}`);
  };
  return (
    <div onClick={onClick}>
      <button {...props} style={styles}>
        {props.children}
      </button>
    </div>
  );
};

export const DropDownItem = props => {
  console.log(props.children);
  return (
    <div {...props} className={`${generalClass} dropdownItem`}>
      {props.children}
    </div>
  );
};
