import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import Loadable from "react-loadable";
import Img from "react-webp-image";

import Logo from "../../assets/logo.svg";
import webpLogo from "../../assets/logo.webp";

// components
import Loading from "../../Loading";

const LanguageSelect = Loadable({
  loader: () => import("../LanguageSelect"),
  loading: Loading
});

const ClientMenu = Loadable({
  loader: () => import("../ClientMenu"),
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
        if (elements[i] === "LanguageSelect") {
          toSet.push(<LanguageSelect />);
        } else if (elements[i] === "ClientMenu") {
          toSet.push(<ClientMenu />);
        }
      }
      this.setState({ toRender: toSet });
    }
  };

  render() {
    return (
      <div
        id="Nav"
        style={{
          width: "100%",
          height: "10vh",
          position: this.props.absolute ? "absolute" : "relative"
        }}
      >
        <nav>
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
      </div>
    );
  }
}

export default Nav;
