import React from "react";

import MainContextProvider from "./ContextProviders/MainContextProvider";
import UserContextProvider from "./ContextProviders/UserContextProvider";
import FetchContextProvider from "./ContextProviders/FetchContextProvider";

import App from "../App";

const Provider = props => {
  return (
    <FetchContextProvider>
      <MainContextProvider>
        <UserContextProvider>
          <App />
        </UserContextProvider>
      </MainContextProvider>
    </FetchContextProvider>
  );
};

export default Provider;
