import React from "react";
import PropTypes from "prop-types";

import { useSpring, animated } from "react-spring";

import Asterisk from "../assets/asterisk.png";

import { Colors, Fonts } from "../styles";

export const Input = props => {
  const style = {
    border: "none",
    outline: "none",
    width: props.width ? props.width : "100%",
    fontSize: "1.5em",
    fontFamily: Fonts.standard
  };

  const pStyle = {
    textAlign: "left",
    pointerEvents: "none",
    height: "1.5rem",
    fontWeight: 400,
    fontFamily: Fonts.standard
  };

  const bStyle = {
    margin: 0,
    padding: 0,
    height: "2px",
    borderRadius: "5px",
    margin: "0 auto",
    transform: "translateY(-1.25em)"
  };

  const [spring, set] = useSpring(() => ({
    fontSize: "1.5em",
    transform: "translateY(-1.25em)",
    color: Colors.subtle,
    config: { velocity: 20 }
  }));

  const [borderSpring, setBorder] = useSpring(() => ({
    backgroundColor: Colors.subtle
  }));

  const handleFocus = e => {
    e.preventDefault();
    set({
      fontSize: "1em",
      transform: "translateY(-3.1em)",
      color: Colors.highlight
    });
    setBorder({
      backgroundColor: Colors.highlight
    });
  };
  const handleUnFocus = e => {
    e.preventDefault();
    set({
      fontSize: e.target.value === "" ? "1.5em" : "1em",
      transform:
        e.target.value === "" ? "translateY(-1.25em)" : "translateY(-3em)",
      color: Colors.subtle
    });
    setBorder({
      backgroundColor: Colors.subtle
    });
  };
  return (
    <div style={{ marginBottom: props.error ? "0.1em" : 0 }}>
      <label htmlFor="input" />
      <input
        {...props}
        onFocus={handleFocus}
        aria-label={props.type ? props.type : "text"}
        onBlur={handleUnFocus}
        style={style}
      />
      <animated.div style={{ ...spring, ...pStyle }}>
        {props.label}{" "}
        {props.required ? (
          <img
            style={{
              width: "7.5px",
              height: "7.5px",
              transform: "translateY(-150%)"
            }}
            src={Asterisk}
          />
        ) : null}
      </animated.div>
      <animated.div style={{ ...borderSpring, ...bStyle }} />
      {props.error ? (
        <div
          style={{
            textAlign: "left",
            transform: "translateY(-1.2em)",
            fontFamily: Fonts.error
          }}
        >
          {props.error}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};
