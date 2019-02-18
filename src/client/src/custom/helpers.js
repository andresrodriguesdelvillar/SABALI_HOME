export const queryString = string => {
  let to_return = {};
  if (string === "") {
    return false;
  }
  const params = string.split("&");
  for (let i in params) {
    const subStrings = params[i].split("=");
    to_return[subStrings[0]] = subStrings[1];
  }
  return to_return;
};

export const getOverlap = (imageWidth, aspectRatio) => {
  const overlap = imageWidth * aspectRatio * -0.075;

  return `${overlap}px`;
};
