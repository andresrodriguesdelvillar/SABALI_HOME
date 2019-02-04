import React from "react";

export const withContext = (context, Component) => {
  return function WrapperComponent(props) {
    return (
      <context.Consumer>
        {state => <Component {...props} context={state} />}
      </context.Consumer>
    );
  };
};

export const withContexts = (contexts, Component) => {
  return function WrapperComponent(props) {
    const contextNames = Object.keys(contexts);
    let contextConsumers = [];
    for (let i in contextNames) {
      contextConsumers.push(contexts[contextNames[i]].Consumer);
    }

    const Consumer1 = contextConsumers[0];
    const context1Name = contextNames[0];
    const Consumer2 = contextConsumers[1];
    const context2Name = contextNames[1];

    return (
      <Consumer1>
        {context1 => (
          <Consumer2>
            {context2 => (
              <Component
                {...props}
                context={{
                  [context1Name]: context1,
                  [context2Name]: context2
                }}
              />
            )}
          </Consumer2>
        )}
      </Consumer1>
    );
  };
};
