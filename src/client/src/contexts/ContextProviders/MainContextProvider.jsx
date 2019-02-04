import React, { Component } from "react";

import { mainContext } from "../contexts";

import { isMobile } from "react-device-detect";

import { mainContextUserAuth } from "../../custom/userAuth";

const checkLanguage = () => {
  return fetch("https://ipapi.co/json").then(res => res.json());
};

class MainContextProvider extends Component {
  state = {
    isMobile: isMobile,
    language: "en",
    loggedIn: false,
    userToken: ""
  };

  componentWillMount() {
    this.handleUserAuth();
    this.handleUserLang();
  }

  handleUserAuth = () => {
    if (mainContextUserAuth() === true && !this.state.loggedIn) {
      this.setState({ loggedIn: true });
    } else if (!mainContextUserAuth() && this.state.loggedIn) {
      this.setState({ loggedIn: false });
    }
  };

  handleUserLang = () => {
    if (
      localStorage.userLanguage &&
      ["de", "en", "nl", "es"].includes(localStorage.userLanguage) &&
      localStorage.userLanguage !== this.state.userLanguage
    ) {
      this.setState({ language: localStorage.userLanguage });
    } else if (
      !localStorage.userLanguage ||
      !["de", "en", "nl", "es"].includes(localStorage.userLanguage)
    ) {
      checkLanguage()
        .then(response => {
          if (["de", "nl", "es"].includes(response.languages)) {
            this.setState({
              language: response.languages
            });
            localStorage.userLanguage = response.language;
          } else {
            this.setState({
              language: "en"
            });
            localStorage.userLanguage = "en";
          }
        })
        .catch(() => {
          this.setState({ language: "en" });
        });
    }
  };

  updateMany = toUpdate => {
    for (let i in toUpdate) {
      this.update(toUpdate[i][0], toUpdate[i][1]);
    }
  };

  update = (key, value) => {
    this.setState({ [key]: value });
  };
  render() {
    return (
      <mainContext.Provider
        value={{
          ...this.state,
          handleUserAuth: this.handleUserAuth,
          update: this.update,
          updateMany: this.updateMany
        }}
      >
        {this.props.children}
      </mainContext.Provider>
    );
  }
}

export default MainContextProvider;
