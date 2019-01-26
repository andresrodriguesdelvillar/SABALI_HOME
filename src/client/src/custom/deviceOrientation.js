export const getMousePosition = e => {
  // returns mouse position with the center as (0/0)
  const x = e.clientX - window.innerWidth / 2;
  const y = e.clientY - window.innerHeight / 2;
  return { x: x, y: y };
};

export const mouseParallax = (position, layers, maxMove) => {
  // creates mouse Parralax based on layers and maxMove parameters
  for (let layer in layers) {
    document.getElementById(layer).style.transform = `translate(${(position.x *
      maxMove *
      layers[layer][0]) /
      window.innerWidth -
      window.innerWidth / 20}px, ${(position.y * maxMove * layers[layer][1]) /
      window.innerHeight -
      window.innerHeight / 20}px)`;
  }
};

export const getOrientation = e => {
  const beta = e.beta;
  const gamma = e.gamma;

  // JS math works in radians
  var betaR = (beta / 180) * Math.PI;
  var gammaR = (gamma / 180) * Math.PI;

  const tilt_horizontal = gammaR / Math.PI;
  const tilt_vertical_portrait = (betaR - Math.PI) / Math.PI;
  const tilt_vertical = betaR / Math.PI;
  const to_return = {
    tilt_horizontal: tilt_horizontal,
    tilt_vertical: tilt_vertical,
    tilt_vertical_portrait: tilt_vertical_portrait
  };
  return to_return;
};

export const mobileParallax = (orientaion, type, maxMove, layers) => {
  for (let layer in layers) {
    switch (type) {
      case "landscape-primary":
        document.getElementById(
          layer
        ).style.transform = `translate(${-orientaion.tilt_vertical *
          layers[layer][1] *
          maxMove}px, ${-orientaion.tilt_horizontal *
          layers[layer][0] *
          maxMove}px)`;
      case "landscape-secondary":
        document.getElementById(
          layer
        ).style.transform = `translate(${-orientaion.tilt_vertical *
          layers[layer][1] *
          maxMove}px, ${-orientaion.tilt_horizontal *
          layers[layer][0] *
          maxMove}px)`;
      default:
        document.getElementById(
          layer
        ).style.transform = `translate(${orientaion.tilt_horizontal *
          layers[layer][0] *
          maxMove}px, ${orientaion.tilt_vertical_portrait *
          layers[layer][1] *
          maxMove}px)`;
    }
  }
};
