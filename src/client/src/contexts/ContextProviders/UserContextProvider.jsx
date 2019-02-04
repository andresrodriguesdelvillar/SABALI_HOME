import React, { Component } from "react";

import { userContext } from "../contexts";

// custom
import { userContextUserAuth } from "../../custom/userAuth";

class UserContextProvider extends Component {
  state = userContextUserAuth();

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
      <userContext.Provider
        value={{
          ...this.state,
          update: this.update,
          updateMany: this.updateMany
        }}
      >
        {this.props.children}
      </userContext.Provider>
    );
  }
}

export default UserContextProvider;
