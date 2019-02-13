import React from "react";

import { useSpring, animated } from "react-spring";

import Asterisk from "./assets/asterisk.png";

import { Colors, Fonts } from "./styles";

export const Form = props => {
  return (
    <form style={{ display: "block" }} noValidate {...props}>
      {props.children}
    </form>
  );
};

export const Title = props => {
  return (
    <h2
      {...props}
      style={{
        fontSize: "2em",
        margin: "2em auto",
        fontFamily: Fonts.standard
      }}
    >
      {props.children}
    </h2>
  );
};

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
      transform: "translateY(-3em)",
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
              transform: "translateY(-80%)"
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
