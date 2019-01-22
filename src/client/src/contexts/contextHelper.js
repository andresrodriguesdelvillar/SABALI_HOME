import { Component } from "react";

import mainContext from "./mainContext";
import { isMobile } from "react-device-detect";

class ContextHelper extends Component {
  state = {};

  componentWillMount() {
    this.context.isMobile = isMobile;

    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(response => {
        this.context.user.location = response.country;
        if (response.languages === "de") {
          this.context.user.language = "de";
        } else if (response.languages === "nl") {
          this.context.user.language = "nl";
        } else if (response.languages === "es") {
          this.context.user.language = "es";
        } else {
          this.context.user.language = "en";
        }
      })
      .catch(() => {
        this.context.user.location = "USA";
        this.context.user.language = "en";
      });
  }

  render() {
    return null;
  }
}

ContextHelper.contextType = mainContext;

export default ContextHelper;
