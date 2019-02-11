import React, { Component } from "react";

import anime from "animejs";

class LoadingSabali extends Component {
  state = {};

  componentDidMount() {
    this.animate();
  }

  animate = () => {
    anime({
      targets: "#Loading path",
      strokeDashoffset: [anime.setDashoffset, 0],
      easing: "easeInOutSine",
      duration: 500,
      delay: function(el, i) {
        return i * 250;
      },
      direction: "alternate",
      loop: true
    });
  };

  render() {
    return (
      <div
        id="Loading"
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
      >
        {/* <svg
          width="100%"
          height="100%"
          version="1.1"
          id="Layer_3"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          x="0px"
          y="0px"
          viewBox="0 0 12.5 8.3"
          background="new 0 0 12.5 8.3;"
          xmlSpace="preserve"
        >
          <style type="text/css">
            {".st0{fill:none;stroke:#C1827E;stroke-miterlimit:10;}"}
          </style>
          <path
            fill="none"
            stroke="#C1827E"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            className="st0"
            d="M9.6,0.5C8.9,0.6,8.2,0.9,7.7,1.4C7.3,1.6,7,2,7.1,2.4C7.2,2.8,7.6,3,7.9,3.2c1.1,0.5,2.2,1.1,3.3,1.6
	c0.2,0.1,0.4,0.2,0.5,0.3C11.9,5.3,12,5.6,12,5.8c0,0.2-0.2,0.4-0.4,0.5c-0.2,0.1-0.5,0.1-0.7,0.2C7.3,6.9,3.7,7.4,0.1,7.8"
          />
        </svg> */}
      </div>
    );
  }
}

export default LoadingSabali;
