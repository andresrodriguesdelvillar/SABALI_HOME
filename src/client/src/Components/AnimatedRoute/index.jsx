import React, { useEffect, useState } from "react";
import { Switch, Route, withRouter, NavLink } from "react-router-dom";

import { useTransition, animated, useSpring } from "react-spring";
import Img from "react-webp-image";

// assets
import Logo from "../SubComponents/Nav/assets/logo.svg";
import webpLogo from "../SubComponents/Nav/assets/logo.webp";

// components
import ClientMenu from "../SubComponents/Nav/subComponents/ClientMenu";
import ContactLink from "../SubComponents/Nav/subComponents/ContactLink";
import Home from "../Home";
import Contact from "../Contact";

const AnimatedRoute = ({ location }) => {
  const [pos, setPos] = useState("Home");
  useEffect(() => {
    if (location.pathname === "/" && pos !== "Home") {
      setPos("Home");
    } else if (location.pathname === "/contact" && pos !== "Contact") {
      setPos("Contact");
    }
  });
  const animationDuration = 5000;
  const [spring, set] = useSpring(() => ({
    opacity: pos === "Contact" ? 0 : 1,
    display: pos === "Contact" ? "none" : "block",
    config: { duration: animationDuration / 3 }
  }));
  const transitions = useTransition(location, location => location.pathname, {
    from: {
      transform: location.state ? "translateY(-99%)" : "translateY(0%)"
    },
    enter: { transform: "translateY(0%)" },
    leave: {
      transform: location.state ? "translateY(100%)" : "translateY(0%)"
    },
    config: { duration: animationDuration }
  });
  const handleNav = e => {
    e.preventDefault();
    set({ opacity: 0, display: "none" });
  };
  const handleHome = e => {
    set({ opacity: 1, display: "block" });
  };
  return transitions.map(({ item, props, key }) => (
    <div key={key}>
      {location.pathname === "/" || location.pathname === "/contact" ? (
        <nav
          style={{
            width: "100vw",
            height: "10vh",
            position: "absolute",
            zIndex: 999
          }}
        >
          <h1 style={{ margin: 0, padding: 0 }}>
            <NavLink to="/" onClick={handleHome}>
              <Img
                style={{ float: "left", minWidth: "100px", width: "15vw" }}
                src={Logo}
                webp={webpLogo}
                alt="Sabali Logo"
              />
            </NavLink>
          </h1>
          <animated.div style={spring} onClick={handleNav}>
            <ContactLink wit />
          </animated.div>
          <ClientMenu wit />
        </nav>
      ) : null}
      <animated.div
        style={{
          ...props,
          position: "absolute",
          width: "100vw"
        }}
      >
        <Switch location={item}>
          <Route exact path="/" render={props => <Home {...props} noNav />} />
          <Route
            path="/contact"
            render={props => <Contact {...props} noNav />}
          />
        </Switch>
      </animated.div>
    </div>
  ));
};

export default withRouter(AnimatedRoute);
