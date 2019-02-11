import React, { Component } from "react";

import anime from "animejs";
import { generate } from "shortid";
import { Transition } from "react-transition-group";

import "./style.scss";

const dropDownItemClass = generate();

export class DropDown extends Component {
  animationDuration = 200;

  state = {
    open: false,
    dropDown_ID: ""
  };

  componentWillMount() {
    this.setState({ dropDown_ID: generate() });
    document.addEventListener("mouseup", this.handleOutsiteClick, true);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleOutsiteClick, true);
  }

  handleOutsiteClick = e => {
    e.preventDefault();
    const wrapper = document.getElementById(this.state.dropDown_ID);

    if (!wrapper.contains(e.target) && this.state.open) {
      this.setState({ open: false });
    }
  };

  toggle = e => {
    e.preventDefault();
    this.setState({ open: !this.state.open });
  };

  handleClose = e => {
    if (e.target.parentNode.tagName !== "A") {
      this.setState({ open: false });
    }
  };

  animateMenuIn = () => {
    anime({
      targets: `.${dropDownItemClass}`,
      duration: this.animationDuration,
      easing: "spring(10, 60, 70, 7)",
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
      targets: `.${dropDownItemClass}`,
      duration: this.animationDuration,
      easing: "spring(10, 60, 70, 7)",
      translateY: [
        0,
        anime.stagger([
          "-100%",
          `-${this.props.children[1].props.children.length * 100}%`
        ])
      ]
    });
  };
  render() {
    return (
      <div
        style={{ width: "100%" }}
        {...this.props}
        className="dropdown"
        id={this.state.dropDown_ID}
      >
        <div onClick={this.toggle}>{this.props.children[0]}</div>
        <Transition
          style={{ width: "100%" }}
          appear={true}
          in={this.state.open}
          enter={true}
          exit={true}
          unmountOnExit
          timeout={this.animationDuration}
          onEnter={() => this.animateMenuIn()}
          onExit={() => this.animateMenuOut()}
        >
          <div onClick={this.handleClose}>{this.props.children[1]}</div>
        </Transition>
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

export const DropDownButton = props => {
  const clickDuration = 200;

  const styles = {
    cursor: "pointer",
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    outline: "none"
  };

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
  return (
    <div
      {...props}
      style={{ margin: 0, padding: 0 }}
      className={`${dropDownItemClass} dropdownItem`}
    >
      {props.children}
    </div>
  );
};
