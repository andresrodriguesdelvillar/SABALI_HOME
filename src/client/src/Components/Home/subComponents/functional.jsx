import React from "react";

import { Link } from "react-router-dom";

export const Client = () => {
  return (
    <div id="client">
      <button>Client</button>
    </div>
  );
};

export const MainLogo = () => {
  return (
    <div id="MainLogo">
      <h1>SABALIINTERWEBS</h1>
    </div>
  );
};

export const Contact = () => {
  return (
    <div id="Contact">
      <button className="btn btn-primary">Contact Me</button>
    </div>
  );
};

export const Team = () => {
  return (
    <div id="Team">
      <button className="btn btn-primary">The Team</button>
    </div>
  );
};

export const LatestWork = props => {
  return (
    <div id="Work">
      <Link to="/latestwork/">
        <div id="triangularImage">
          <img src={props.image_url} alt="" />
        </div>
      </Link>
    </div>
  );
};
