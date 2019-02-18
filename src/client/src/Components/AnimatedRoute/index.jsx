import React, { useEffect, useState } from "react";
import { Switch, Route, NavLink } from "react-router-dom";

import { useTransition, animated } from "react-spring";
import Img from "react-webp-image";

// assets
import Logo from "../SubComponents/Nav/assets/logo.svg";
import webpLogo from "../SubComponents/Nav/assets/logo.webp";

// components
import ClientMenu from "../SubComponents/Nav/subComponents/ClientMenu";
import ContactLink from "../SubComponents/Nav/subComponents/ContactLink";
import Home from "../Home";
import Contact from "../Contact";

const AnimatedRoute = ({ location, history }) => {
  // useState for the current location (true=Home)
  const [pos, setPos] = useState(true);

  // useEffect to handle state
  useEffect(() => {
    if (location.state && location.pathname === "/") {
      history.replace({ pathname: "/", state: false });
    }
    if (location.pathname === "/" && !pos) {
      setPos(true);
    } else if (location.pathname === "/contact" && pos) {
      setPos(false);
    }
  });

  // configure animations...

  // contact button fadeout
  const contactButTransition = useTransition(pos, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { friction: 200, tension: 500 }
  });

  // Page transition
  const transitions = useTransition(location, location => location.pathname, {
    from: {
      transform: location.state
        ? pos
          ? "translateY(-100%)"
          : "translateY(100%)"
        : "translateY(0%)"
    },
    enter: { transform: "translateY(0%)" },
    leave: {
      transform: location.state
        ? pos
          ? "translateY(100%)"
          : "translateY(-100%)"
        : "translateY(0%)"
    },
    unique: true,
    config: { friction: 200, tension: 500 }
  });

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        width: "100vw",
        height: "100vh"
      }}
    >
      <nav
        style={{
          width: "100vw",
          height: "10vh",
          position: "absolute",
          zIndex: 999
        }}
      >
        <h1 style={{ margin: 0, padding: 0 }}>
          <NavLink to={{ pathname: "/", state: true }}>
            <Img
              style={{ float: "left", minWidth: "100px", width: "15vw" }}
              src={Logo}
              webp={webpLogo}
              alt="Sabali Logo"
            />
          </NavLink>
        </h1>
        {contactButTransition.map(
          ({ item, key, props }) =>
            item && (
              <animated.div key={key} style={props}>
                <ContactLink wit />
              </animated.div>
            )
        )}

        <ClientMenu wit />
      </nav>
      {transitions.map(({ item, props, key }) => {
        return (
          <animated.div
            key={key}
            style={{
              ...props,
              position: "absolute",
              width: "100vw"
            }}
          >
            <Switch location={item}>
              <Route
                exact
                path="/"
                render={props => <Home {...props} noNav />}
              />
              <Route
                path="/contact"
                render={props => <Contact {...props} noNav />}
              />
            </Switch>
          </animated.div>
        );
      })}
    </div>
  );
};

export default AnimatedRoute;
