import { arrayIncludes } from "../../../customFuncs/checks";
import jwt from "jsonwebtoken";

const userAuthentication = userToken => {
  return jwt.verify(userToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return false;
    } else {
      const requires = ["ID", "Name", "Company", "Email"];
      if (!arrayIncludes(requires, Object.keys(decoded))) {
        return false;
      } else if (arrayIncludes(requires, Object.keys(decoded))) {
        return { ...decoded, valid: true };
      } else {
        return false;
      }
    }
  });
};

export const userContextUserAuth = () => {
  if (localStorage.userToken) {
    const validUser = userAuthentication(localStorage.userToken);
    if (validUser) {
      try {
        return {
          loggedIn: validUser.valid,
          ID: validUser.ID,
          Name: validUser.Name,
          Company: validUser.Company,
          Email: validUser.Email
        };
      } catch {
        return {
          loggedIn: false,
          ID: false,
          Name: false,
          Company: false,
          Email: false
        };
      }
    }
    return {
      loggedIn: false,
      ID: false,
      Name: false,
      Company: false,
      Email: false
    };
  }
};

export const mainContextUserAuth = () => {
  if (localStorage.userToken) {
    const validUser = userAuthentication(localStorage.userToken);
    if (validUser) {
      if (validUser.valid) {
        return true;
      }
    }
  }
  return false;
};
