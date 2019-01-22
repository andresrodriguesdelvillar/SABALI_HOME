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
  },
  fetch: {
    register: body => {
      console.log(body);
      if (process.env.NODE_ENV === "production") {
        return fetch("/user/register", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(body)
        });
      } else {
        return fetch("http://localhost:5000/user/register", {
          headers: {
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify(body)
        });
      }
    }
  }
});
