const userLocation = () => {
  const to_return = {};
  fetch("https://ipapi.co/json")
    .then(res => res.json())
    .then(response => {
      to_return.location = response.country;
      if (response.languages === "de") {
        to_return.language = "de";
      } else if (response.languages === "nl") {
        to_return.language = "nl";
      } else if (response.languages === "es") {
        to_return.language = "es";
      } else {
        to_return.language = "en";
      }
    })
    .catch(() => {
      to_return.location = "USA";
      to_return.language = "en";
    });
  console.log(to_return);
  return to_return;
};
