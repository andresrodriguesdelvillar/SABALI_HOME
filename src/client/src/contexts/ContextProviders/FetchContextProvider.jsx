import React, { Component } from "react";

import { fetchContext } from "../contexts";

class FetchContextProvider extends Component {
  state = {
    post: (body, url) => {
      if (process.env.NODE_ENV === "production") {
        return fetch(url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });
      } else {
        return fetch("http://localhost:5000" + url, {
          method: "POST",
          mode: "cors",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(body)
        });
      }
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
      <fetchContext.Provider
        value={{
          ...this.state,
          update: this.update,
          updateMany: this.updateMany
        }}
      >
        {this.props.children}
      </fetchContext.Provider>
    );
  }
}

export default FetchContextProvider;
