/* This is a User backend in express.

_____DEPENDENCIES_______

express
cors
bcrypt
jsonwebtoken
*/
import express from "express";
import cors from "cors";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/*____CONFIGS_____

---SECRET_KEY*/
import { SECRET_KEY } from "../config/secrets";
process.env.SECRET_KEY = SECRET_KEY;

//--- mongoose Model---
import User from "../models/user";
// initialize route
const route = express.Router();
// use cors for route
route.use(cors());

// external custom functions

import { validateEmail, validatePassword } from "../../customFuncs/validation";

import { SendMail } from "../customFuncs/Nodemaile";
import { resolve } from "url";

// ROUTES

/*
@route   POST /user/register
@desc    Register a user
@access  Public
@requires: Email, Password, PasswordConf
@optional: Name, Company
 */

route.post("/register", (req, res) => {
  const UserInfo = {
    Email: req.body.Email,
    Name: req.body.Name,
    Company: req.body.Company,
    Password: req.body.Password,
    PasswordConf: req.body.PasswordConf
  };
  const error = {};
  // check if userInfo is valid
  const checks = {
    Email: validateEmail(UserInfo.Email),
    Password: validatePassword(UserInfo.Password, UserInfo.PasswordConf)
  };
  for (let check in checks) {
    if (checks[check] !== true) {
      error[check] = checks[check];
    }
  }
  if (Object.keys(error).length !== 0) {
    res.status(400).send({ error: error });
  } else {
    // if no errors
    // => hash password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        res.status(400).send({ error: err });
      } else {
        bcrypt.hash(UserInfo.Password, salt, (err, hash) => {
          if (err) {
            res.status(400).send({ error: err });
          } else {
            // User Information to store in DB
            const ToStore = {
              Email: UserInfo.Email,
              Name: UserInfo.Name,
              Company: UserInfo.Company,
              Password: hash
            };
            // check if user exists (by Email)
            User.findOne({ Email: ToStore.Email }).then(user => {
              if (user) {
                res
                  .status(400)
                  .send({ error: "The Email is already registered" });
              } else {
                // if user does not exist create new user
                User.create(ToStore)
                  .then(response => {
                    const payload = {
                      Email: response.Email,
                      Password: response.Password,
                      ID: response._id,
                      type: "confirm"
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                      expiresIn: 1440
                    });
                    const Link =
                      req.protocol +
                      "://" +
                      req.get("host") +
                      "/user/sendemail/" +
                      token;
                    res.status(202).redirect(Link);
                  })
                  .catch(err => {
                    res
                      .status(404)
                      .send(`Error while registering User: ${err}`);
                  });
              }
            });
          }
        });
      }
    });
  }
});

route.get("/sendemail/:token", (req, res) => {
  const decoded = jwt.verify(req.params["token"], process.env.SECRET_KEY);
  // confirm email
  if (decoded.type === "confirm") {
    const payload = {
      Email: decoded.Email,
      Password: decoded.Password,
      ID: decoded.ID
    };
    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: 1440
    });
    // Link for email confirmation
    const Link =
      req.protocol + "://" + req.get("host") + "/user/confirmaccount/" + token;
    // Send email with nodemailer
    SendMail(decoded.Email, Link)
      .then(email => {
        console.log(email);
        res.status(200).send(email);
      })
      .catch(err => {
        console.log(err);
        res.status(404).send({ error: err });
      });
  }
});

route.get("/confirmaccount/:token", (req, res) => {
  const decoded = jwt.verify(req.params["token"], process.env.SECRET_KEY);
  User.findOneAndUpdate(
    { _id: decoded.ID },
    { Confirmed: true },
    (err, response) => {
      if (err) {
        res.status(400).send({ error: err });
      } else {
        res.status(202).send(response);
      }
    }
  );
});

export default route;
