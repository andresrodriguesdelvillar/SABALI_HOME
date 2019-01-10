import React, { Component, createContext } from "react";

export const exampleContext = createContext();

export class ExampleProvider extends Component {
  state = {
    user: [],
    number: 10,
    sentence: "this sentence is provided by the context_api"
  };

  fetchUser = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(users => {
        this.setState({ user: users });
      });
  };

  render() {
    return (
      <exampleContext.Provider
        value={{ ...this.state, fetchUser: this.fetchUser }}
      >
        {this.props.children}
      </exampleContext.Provider>
    );
  }
}
