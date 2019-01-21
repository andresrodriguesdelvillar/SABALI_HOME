import { createContext } from "react";

export default createContext({
  isMobile: false,
  user: {
    location: "USA",
    language: "en",
    loggedIn: false,
    details: {
      id: false,
      name: false,
      company: false,
      email: false
    }
  }
});
