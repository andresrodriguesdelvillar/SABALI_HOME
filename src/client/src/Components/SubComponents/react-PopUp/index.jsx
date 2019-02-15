import React, { useState, useEffect } from "react";

import { useSpring, animated } from "react-spring";

import { Colors } from "./style";

import PropTypes from "prop-types";

const PupUp = props => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (props.duration) {
      if (!isNaN(Number(props.duration))) {
        timer(props.duration);
      } else {
        console.error(
          "The duration should be a valid number, representing the time in seconds the PopUp should be presented"
        );
      }
    }
  });

  const timer = duration => {
    setTimeout(() => {
      set({
        transform: `translateY(${props.height ? `-${props.height}` : "-100%"})`
      });
      setTimeout(() => {
        setOpen(false);
      }, animationDuration);
    }, duration * 1000);
  };

  const animationDuration = 300;
  const [spring, set] = useSpring(() => ({
    from: {
      transform: `translateY(${props.height ? `-${props.height}` : "-100%"})`
    },
    transform: "translateY(0)"
  }));
  const Style = {
    margin: "0 auto",
    zIndex: 9999,
    borderRadius: props.borderRadius ? props.borderRadius : 3,
    position: props.relative ? "relative" : "absolute",
    left: props.left ? 0 : props.right ? "" : 0,
    right: props.right ? 0 : props.left ? "" : 0,
    lineHeight: props.lineHeight ? props.lineHeight : "4em",
    height: props.height ? props.height : "",
    color: props.color ? props.color : Colors.text,
    width: props.width ? props.width : "100%",
    textAlign: props.textAlign ? props.textAlign : "center",
    backgroundColor: props.backgroundColor
      ? props.backgroundColor
      : Colors.background
  };
  const closeStyle = {
    cursor: "pointer",
    float: "right",
    margin: "0 2em "
  };
  const handleClose = e => {
    e.preventDefault();
    set({
      transform: `translateY(${props.height ? `-${props.height}` : "-100%"})`
    });
    setTimeout(() => {
      setOpen(false);
    }, animationDuration);
  };
  return open ? (
    <animated.div className="popup" style={{ ...Style, ...spring }}>
      {props.content}
      <div onClick={handleClose} style={closeStyle}>
        &times;
      </div>
    </animated.div>
  ) : null;
};

PupUp.propTypes = {
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  relative: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  lineHeight: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  backgroundColor: PropTypes.string,
  borderRadius: PropTypes.string,
  duration: PropTypes.string,
  textAlign: PropTypes.oneOf(["left", "right"])
};

export default PupUp;
