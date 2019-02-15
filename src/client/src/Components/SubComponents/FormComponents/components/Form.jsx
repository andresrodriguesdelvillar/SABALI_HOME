import React from "react";

export const Form = props => {
  return (
    <form style={{ display: "block" }} noValidate {...props}>
      {props.children}
    </form>
  );
};
