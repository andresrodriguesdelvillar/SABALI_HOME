import React from "react";

import { Colors, Fonts } from "../styles";

export const TextField = props => {
  const wrapperStyles = {
    border: `solid 1.5px ${Colors.subtle}`,
    borderRadius: "3px",
    padding: "1em",
    margin: "0 auto",
    width: "95%",
    fontFamily: Fonts.standard,
    boxSizing: "border-box"
  };
  const styles = {
    width: "100%",
    outline: "none",
    fontSize: "1.25em",
    resize: "none",
    border: "none"
  };
  return (
    <div style={wrapperStyles}>
      <label for={props.type ? props.type : "textarea"} />
      <textarea
        aria-label={props.type ? props.type : "textarea"}
        style={styles}
        {...props}
      />
    </div>
  );
};
