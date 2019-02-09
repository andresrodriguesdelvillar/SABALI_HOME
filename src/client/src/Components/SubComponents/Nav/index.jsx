import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import Loadable from "react-loadable";
import Img from "react-webp-image";

import Logo from "./assets/logo.svg";
import webpLogo from "./assets/logo.webp";

// components
import Loading from "../../Loading";

const LanguageSelect = Loadable({
  loader: () => import("./subComponents/LanguageSelect"),
  loading: Loading
});
const ClientMenu = Loadable({
  loader: () => import("./subComponents/ClientMenu"),
  loading: Loading
});
const ContactLink = Loadable({
  loader: () => import("./subComponents/ContactLink"),
  loading: Loading
});

class Nav extends Component {
  state = {
    toRender: []
  };

  componentWillMount() {
    this.setElements();
  }

  setElements = () => {
    const elements = this.props.include;
    if (elements) {
      let toSet = [];
      for (let i in elements) {
        switch (elements[i]) {
          case "LanguageSelect":
            toSet.push(<LanguageSelect />);
            break;
          case "ClientMenu":
            toSet.push(<ClientMenu wit={this.props.wit} />);

            break;
          case "ContactLink":
            if (this.props.transition) {
              toSet.push(
                <ContactLink
                  wit={this.props.wit}
                  transition={this.props.transition}
                />
              );
            } else {
              toSet.push(<ContactLink wit={this.props.wit} />);
            }
            break;
          default:
        }
      }
      this.setState({ toRender: toSet });
    }
  };

  render() {
    return (
      <nav
        style={{
          width: "100%",
          height: "10vh",
          position: this.props.absolute ? "absolute" : "relative"
        }}
      >
        <h1 style={{ margin: 0, padding: 0 }}>
          <NavLink to="/">
            <Img
              style={{ float: "left", minWidth: "100px", width: "15vw" }}
              src={Logo}
              webp={webpLogo}
              alt="Sabali Logo"
            />
          </NavLink>
        </h1>
        {this.state.toRender.map((Comp, i) => {
          return <div key={i}>{Comp}</div>;
        })}
      </nav>
    );
  }
}

export default Nav;
