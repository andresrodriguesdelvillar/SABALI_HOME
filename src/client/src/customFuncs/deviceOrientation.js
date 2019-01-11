export const mouseTracker = e => {
  const layers = {
    layer2: [-32, -32],
    layer3: [-16, -16],
    layer4: [-9, -9]
  };

  for (let layer in layers) {
    document.getElementById(layer).style.transform = `translate(${(e.clientX *
      layers[layer][0]) /
      window.innerWidth}px, ${(e.clientY * layers[layer][1]) /
      window.innerHeight}px)`;
  }
};

export const handleOrientation = e => {
  const alpha = event.alpha;
  const beta = event.beta;
  const gamma = event.gamma;

  // JS math works in radians
  var betaR = (beta / 180) * Math.PI;
  var gammaR = (gamma / 180) * Math.PI;
  var spinR = Math.atan2(Math.cos(betaR) * Math.sin(gammaR), Math.sin(betaR));

  // convert back to degrees
  var spin = (spinR * 180) / Math.PI;

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

export const mobileParallax = (orientaion, type, maxMove) => {
  const layers = {
    layer2: [-32, -32],
    layer3: [-16, -16],
    layer4: [-9, -9]
  };
  for (let layer in layers) {
    if (type == "landscape-primary") {
      document.getElementById(
        layer
      ).style.transform = `translate(${-orientaion.tilt_vertical *
        layers[layer][1] *
        maxMove}px, ${-orientaion.tilt_horizontal *
        layers[layer][0] *
        maxMove}px)`;
    } else if (type == "landscape-secondary") {
      document.getElementById(
        layer
      ).style.transform = `translate(${-orientaion.tilt_vertical *
        layers[layer][1] *
        maxMove}px, ${-orientaion.tilt_horizontal *
        layers[layer][0] *
        maxMove}px)`;
    } else {
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
