import React, { Component } from "react";

import { NavLink } from "react-router-dom";
import Loadable from "react-loadable";

import Logo from "../../assets/logo.svg";

//style
import "./style.scss";

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
      <div id="Nav">
        <nav>
          <h1>
            <NavLink to="/">
              <img id="Logo" src={Logo} alt="Sabali Logo" />
            </NavLink>
          </h1>
          {this.state.toRender.map((comp, i) => {
            return <pre key={i}>{comp}</pre>;
          })}
        </nav>
      </div>
    );
  }
}

export default Nav;
