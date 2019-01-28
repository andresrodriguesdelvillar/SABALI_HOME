import React, { Component, createContext } from "react";

import jwt from "jsonwebtoken";
import { isMobile } from "react-device-detect";

export const mainContext = createContext();

const checkLocationAndLanguage = () => {
  return fetch("https://ipapi.co/json").then(res => res.json());
};

class Provider extends Component {
  state = {
    isMobile: isMobile,
    location: "USA",
    language: "en",
    user: {
      loggedIn: false,
      details: {
        ID: false,
        Name: false,
        Company: false,
        Email: false
      }
    },
    fetch: {
      post: (body, url) => {
        if (process.env.NODE_ENV === "production") {
          return fetch(url, {
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(body)
          });
        } else {
          return fetch("http://localhost:5000" + url, {
            headers: {
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(body)
          });
        }
      },
      get: url => {
        if (process.env.NODE_ENV === "production") {
          return fetch(url);
        } else {
          return fetch("http://localhost:5000" + url);
        }
      }
    }
  };

  componentWillMount() {
    if (localStorage.userToken) {
      jwt.verify(
        localStorage.userToken,
        process.env.SECRET_KEY,
        (err, decoded) => {
          if (err) {
            localStorage.removeItem("userToken");
            // this.setState({
            //   user: {
            //     loggedIn: false,
            //     details: {
            //       ID: false,
            //       Name: false,
            //       Company: false,
            //       Email: false
            //     }
            //   }
            // });
            return;
          } else {
            this.setState({
              user: {
                loggedIn: true,
                details: {
                  ID: decoded.ID,
                  Name: decoded.Name,
                  Company: decoded.Company,
                  Email: decoded.Email
                }
              }
            });
          }
        }
      );
    }
    if (localStorage.userLanguage) {
      if (
        localStorage.userLanguage === "de" ||
        localStorage.userLanguage === "nl" ||
        localStorage.userLanguage === "es"
      ) {
        this.setState({ language: localStorage.userLanguage });
      } else {
        this.setState({ language: "en" });
      }
      checkLocationAndLanguage().then(response => {
        this.setState({ location: response.country });
      });
    } else {
      checkLocationAndLanguage()
        .then(response => {
          if (
            response.languages === "de" ||
            response.languages === "nl" ||
            response.languages === "es"
          ) {
            this.setState({
              location: response.country,
              language: response.languages
            });
            localStorage.userLanguage = response.language;
          } else {
            this.setState({
              location: response.country,
              language: "en"
            });
            localStorage.userLanguage = "en";
          }
        })
        .catch(() => {
          this.setState({ location: "USA", language: "en" });
        });
    }
  }

  updatePosition = position => {
    console.log(position);
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
          update: this.update,
          updateMany: this.updateMany
        }}
      >
        {this.props.children}
      </mainContext.Provider>
    );
  }
}

export default Provider;
