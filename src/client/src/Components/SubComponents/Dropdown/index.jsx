import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import { generate } from "shortid";
import { useSprings, animated, useSpring } from "react-spring";

export const DropDown = props => {
  // general vars
  const animationDuration = 300;
  const Menu_ID = generate();
  const Many = props.children[1].props.children.length > 1 ? true : false;
  // useState
  const [open, setOpen] = useState(false);

  let springs;
  let setDropDown;
  // setSprings for animation
  if (Many) {
    [springs, setDropDown] = useSprings(
      props.children[1].props.children.length,
      i => ({
        transform: `translateY(${(i + 1) * -100}%)`,
        config: { mass: 2, friction: 20, tension: 150 }
      })
    );
  } else {
    [springs, setDropDown] = useSpring(() => ({
      transform: `translateY(-100%)`,
      config: { mass: 2, friction: 20, tension: 150 }
    }));
  }

  useEffect(() => {
    document.addEventListener("mouseup", handleOutsiteClick, true);
    return () =>
      document.removeEventListener("mouseup", handleOutsiteClick, true);
  });

  const handleOutsiteClick = e => {
    e.preventDefault();
    if (open) {
      const wrapper = document.getElementById(Menu_ID);

      if (!wrapper.contains(e.target)) {
        if (Many) {
          setDropDown(i => ({
            transform: `translateY(${(i + 1) * -100}%)`
          }));
        } else {
          setDropDown(i => ({
            transform: `translateY(-100%)`
          }));
        }
        setTimeout(() => {
          setOpen(false);
        }, animationDuration);
      }
    }
  };

  const toggle = e => {
    e.preventDefault();
    if (open) {
      if (Many) {
        setDropDown(i => ({
          transform: `translateY(${(i + 1) * -100}%)`
        }));
      } else {
        setDropDown(i => ({
          transform: `translateY(-100%)`
        }));
      }

      setTimeout(() => {
        setOpen(false);
      }, animationDuration);
    } else {
      setOpen(true);
      setDropDown({
        transform: `translateY(0%)`
      });
    }
  };

  const handleClose = e => {
    if (e.target.parentNode.tagName === "A" || e.target.tagName === "A") {
      document.removeEventListener("mouseup", handleOutsiteClick, true);
    } else {
      if (Many) {
        setDropDown(i => ({
          transform: `translateY(${(i + 1) * -100}%)`
        }));
      } else {
        setDropDown(i => ({
          transform: `translateY(-100%)`
        }));
      }
      setTimeout(() => {
        setOpen(false);
      }, animationDuration);
    }
  };
  const Style = {
    width: props.width ? props.width : 100
  };
  return (
    <div id={Menu_ID} style={Style}>
      <div onClick={toggle}>{props.children[0]}</div>
      {open ? (
        <DropDownMenu {...props.children[1].props} onClick={handleClose}>
          {Many ? (
            springs.map((animeprops, i) => (
              <animated.div key={i} style={animeprops}>
                {props.children[1].props.children[i]}
              </animated.div>
            ))
          ) : (
            <animated.div style={springs}>
              {props.children[1].props.children}
            </animated.div>
          )}
        </DropDownMenu>
      ) : null}
    </div>
  );
};

DropDown.propTypes = {
  width: PropTypes.string
};

export const DropDownMenu = props => {
  const styles = {
    width: "80%",
    margin: "0.5em auto 0 auto",
    left: 0,
    right: 0,
    textAlign: "center",
    cursor: "pointer"
  };
  return (
    <div {...props} style={styles}>
      {props.children}
    </div>
  );
};

export const DropDownButton = props => {
  const styles = {
    cursor: "pointer",
    backgroundColor: "transparent",
    border: "none",
    outline: "none",
    width: "100%"
  };
  const wrapperStyles = {
    margin: "0 auto",
    width: "100%",
    left: 0,
    right: 0,
    textAlign: "center"
  };

  const [spring, set] = useSpring(() => ({ transform: "scale(1)" }));

  const onMouseDown = e => {
    e.preventDefault();
    if (e.button === 0) {
      set({ transform: "scale(0.9)" });
    }
  };
  const onMouseUp = e => {
    e.preventDefault();
    set({ transform: "scale(1)" });
  };
  return (
    <animated.div
      style={{ ...spring, ...wrapperStyles }}
      onMouseUp={onMouseUp}
      onMouseDown={onMouseDown}
    >
      <button {...props} style={styles}>
        {props.children}
      </button>
    </animated.div>
  );
};

export const DropDownItem = props => {
  const [spring, set] = useSpring(() => ({ transform: "scale(1)" }));

  const hover = e => {
    e.preventDefault();
    set({ transform: "scale(1.1)" });
  };

  const leave = e => {
    e.preventDefault();
    set({ transform: "scale(1)" });
  };

  return (
    <animated.div
      onMouseEnter={hover}
      onMouseLeave={leave}
      style={spring}
      {...props}
    >
      {props.children}
    </animated.div>
  );
};
