import React, { useState, useEffect } from "react";

import { generate } from "shortid";
import { useSprings, animated, useSpring } from "react-spring";

export const DropDown = props => {
  // general vars
  const animationDuration = 300;
  const Menu_ID = generate();

  // useState
  const [open, setOpen] = useState(false);

  // setSprings for animation

  const [springs, set] = useSprings(
    props.children[1].props.children.length,
    i => ({
      transform: `translateY(${(i + 1) * -100}%)`,
      config: { mass: 2, friction: 20, tension: 150 }
    })
  );

  useEffect(() => {
    document.addEventListener("mouseup", handleOutsiteClick, true);
    return () =>
      document.removeEventListener("mouseup", handleOutsiteClick, true);
  });

  const handleOutsiteClick = e => {
    e.preventDefault();
    const wrapper = document.getElementById(Menu_ID);

    if (!wrapper.contains(e.target) && open) {
      set(i => ({
        transform: `translateY(${(i + 1) * -100}%)`
      }));
      setTimeout(() => {
        setOpen(false);
      }, animationDuration);
    }
  };

  const toggle = e => {
    e.preventDefault();
    if (open) {
      set(i => ({
        transform: `translateY(${(i + 1) * -100}%)`
      }));
      setTimeout(() => {
        setOpen(false);
      }, animationDuration);
    } else {
      setOpen(true);
      set({
        transform: `translateY(0)`
      });
    }
  };

  const handleClose = e => {
    if (e.target.parentNode.tagName !== "A") {
      set(i => ({
        transform: `translateY(${(i + 1) * -100}%)`
      }));
      setTimeout(() => {
        setOpen(false);
      }, animationDuration);
    }
  };
  return (
    <div id={Menu_ID} style={{ width: "100%" }}>
      <div onClick={toggle}>{props.children[0]}</div>
      {open ? (
        <DropDownMenu {...props.children[1].props} onClick={handleClose}>
          {springs.map((animeprops, i) => (
            <animated.div key={i} style={animeprops}>
              {props.children[1].props.children[i]}
            </animated.div>
          ))}
        </DropDownMenu>
      ) : null}
    </div>
  );
};

export const DropDownMenu = props => {
  const styles = {
    width: "80%",
    margin: "0 auto",
    marginTop: "0.5em",
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
    width: "100%",
    backgroundColor: "transparent",
    border: "none",
    outline: "none"
  };

  const [spring, set] = useSpring(() => ({ transform: "scale(1)" }));

  const onMouseDown = e => {
    e.preventDefault();
    set({ transform: "scale(0.9)" });
  };
  const onMouseUp = e => {
    e.preventDefault();
    set({ transform: "scale(1)" });
  };
  return (
    <animated.div
      style={spring}
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
