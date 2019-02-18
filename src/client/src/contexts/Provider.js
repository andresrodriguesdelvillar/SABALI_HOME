import React from "react";

import MainContextProvider from "./ContextProviders/MainContextProvider";
import UserContextProvider from "./ContextProviders/UserContextProvider";
import FetchContextProvider from "./ContextProviders/FetchContextProvider";

const Provider = props => {
  return (
    <FetchContextProvider>
      <MainContextProvider>
        <UserContextProvider>{props.children}</UserContextProvider>
      </MainContextProvider>
    </FetchContextProvider>
  );
};

export default Provider;
