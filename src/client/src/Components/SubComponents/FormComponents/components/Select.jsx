import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { useSpring, animated } from "react-spring";

import { generate } from "shortid";

import DropDownIcon from "../assets/drop-down-arrow.png";

import { Colors, Fonts } from "../styles";

export const Select = props => {
  // useState for open/close
  const [open, setOpen] = useState(false);
  const [currentValue, setValue] = useState(props.currentValue);
  const [keyUser, setKeyUser] = useState(false);

  useEffect(() => {
    document.addEventListener("mouseup", handleOutsideClick, true);
    document.addEventListener("keydown", kbUser, true);
    return () => {
      document.removeEventListener("keydown", kbUser, true);
      document.removeEventListener("mouseup", handleOutsideClick, true);
    };
  });

  const kbUser = e => {
    if (e.keyCode === 9) {
      setKeyUser(true);
      document.removeEventListener("keydown", kbUser, true);
    }
  };

  const selectID = generate();

  const handleOutsideClick = e => {
    e.preventDefault();
    const wrapper = document.getElementById(selectID);
    if (!wrapper.contains(e.target) && open) {
      setOpen(false);
    }
  };

  // _______Styles__________
  //__outerDiv Styles__
  const selectBoxStyles = {
    left: 0,
    right: 0,
    width: "100%",
    margin: "1em auto"
  };

  //__options div styles__
  const optionsStyle = {
    borderStyle: "none solid solid solid",
    borderWidth: "0px",
    borderRadius: "5px",
    boxShadow: " 0px 12px 37px 1px rgba(0,0,0,0.47)",
    position: "absolute",
    width: props.width ? props.width : 100,
    fontFamily: props.fontFamily ? props.fontFamily : Fonts.standard,
    margin: "0 auto",
    left: 0,
    right: 0,
    zIndex: 9999
  };
  //__selectButton Style__
  const selectButtonStyle = {
    borderStyle: "none none solid none",
    borderWidth: "1px",
    borderColor: "black",
    cursor: "pointer",
    fontFamily: props.fontFamily ? props.fontFamily : Fonts.standard,
    width: props.width ? props.width : 100,
    textAlign: "left",
    backgroundColor: "transparent",
    outline: keyUser ? "  " : "none"
  };

  // ______handler______
  const toggle = e => {
    e.preventDefault();
    setOpen(!open);
  };
  const handleSelect = e => {
    e.preventDefault();
    setValue(e.target.innerText);
    setOpen(false);
    if (props.onChange) {
      props.onChange(e.target.attributes.value.value);
    }
  };
  return (
    <div style={selectBoxStyles} id={selectID} className="selectBox">
      <button style={selectButtonStyle} onClick={toggle}>
        {currentValue}
        <img
          style={{ float: "right", width: ".8em" }}
          src={DropDownIcon}
          alt=""
        />
      </button>
      {open ? (
        <div style={optionsStyle} className="selectOptions">
          {Object.keys(props.options).map((optionKey, i) => {
            return (
              <SelectOption
                keyuser={keyUser}
                onClick={handleSelect}
                value={optionKey}
                key={i}
                hoverColor={props.hoverColor}
              >
                {props.options[optionKey]}
              </SelectOption>
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

Select.propTypes = {
  currentValue: PropTypes.string.isRequired,
  options: PropTypes.object.isRequired,
  onChange: PropTypes.func,
  hoverColor: PropTypes.string,
  width: PropTypes.string,
  fontFamily: PropTypes.string
};

const SelectOption = props => {
  const [spring, set] = useSpring(() => ({
    backgroundColor: "white"
  }));

  //__option button styles__
  const optionStyle = {
    width: "100%",
    outline: props.keyuser ? "" : "none",
    borderStyle: "none none solid none",
    borderWidth: "0px",
    borderRadius: "5px",
    cursor: "pointer",
    padding: ".3em 0",
    display: "block",
    left: 0,
    right: 0
  };
  const mouseEnter = e => {
    e.preventDefault();
    set({
      backgroundColor: props.hoverColor ? props.hoverColor : Colors.subtle
    });
  };
  const mouseLeave = e => {
    e.preventDefault();
    set({ backgroundColor: "white" });
  };
  return (
    <animated.button
      onMouseEnter={mouseEnter}
      onMouseLeave={mouseLeave}
      onClick={props.onClick}
      value={props.value}
      style={{ ...optionStyle, ...spring }}
    >
      {props.children}
    </animated.button>
  );
};
