import React from "react";
import PropTypes from "prop-types";

import { useSpring, animated } from "react-spring";

import { Fonts } from "../styles";

export const SubmitButton = props => {
  const styles = {
    cursor: "pointer",
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    fontFamily: Fonts.standard
  };

  const [spring, set] = useSpring(() => ({
    transform: "scale(1)"
  }));

  const onMouseDown = e => {
    set({ transform: "scale(0.9)" });
  };
  const onMouseUp = e => {
    set({ transform: "scale(1)" });
  };
  return (
    <div
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      style={{ width: "80%", margin: "0 auto" }}
    >
      <animated.button
        {...props}
        aria-label="submit"
        style={{ ...styles, ...spring }}
      >
        {props.children}
      </animated.button>
    </div>
  );
};
