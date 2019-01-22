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
const user = express.Router();
// use cors for route
user.use(cors());

// external custom functions

import { validateEmail, validatePassword } from "../../customFuncs/validation";
import { arrayIncludes } from "../customFuncs/checks";
import {
  SendConfMail,
  SendResetPassMail,
  testTemplate
} from "../customFuncs/SendMail";

import { BaseUrl } from "../../config/Host";

// ROUTES

/*
@route   POST /user/register
@desc    Register a user
@access  Public
@requires: Email, Password, PasswordConf
@optional: Name, Company -- can be empty, but are required
*/

// registers the user in DB with email confirmation = false
user.post("/register", (req, res, next) => {
  console.log(req.body);
  const requires = ["Email", "Password", "PasswordConf", "Name", "Company"];
  if (!arrayIncludes(requires, Object.keys(req.body))) {
    console.log("register1");
    res.status(400).send({ error: "bad request" });
    return;
  }
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
        res.status(500).send({ error: err });
      } else {
        bcrypt.hash(UserInfo.Password, salt, (err, hash) => {
          if (err) {
            res.status(500).send({ error: err });
          } else {
            // User Information to store in DB
            const ToStore = {
              Email: UserInfo.Email.toLowerCase(),
              Name: UserInfo.Name,
              Company: UserInfo.Company,
              Password: hash
            };
            // check if user exists (by Email)
            User.findOne({ Email: ToStore.Email }).then(user => {
              if (user) {
                res.status(200).send({
                  error: "The Email is already registered",
                  success: false
                });
              } else {
                // if user does not exist create new user
                User.create(ToStore)
                  .then(response => {
                    const payload = {
                      Email: response.Email,
                      Password: response.Password,
                      ID: response._id
                    };
                    let token = jwt.sign(payload, process.env.SECRET_KEY, {
                      expiresIn: 1440
                    });
                    const Link =
                      req.protocol +
                      "://" +
                      req.get("host") +
                      "/user/confirmaccount/" +
                      token;
                    SendConfMail(req.body.Email, Link)
                      .then(messageId => {
                        delete payload.ID;
                        const queryToken = jwt.sign(
                          payload,
                          process.env.SECRET_KEY,
                          {
                            expiresIn: 1440
                          }
                        );
                        res.status(202).send({
                          messageId: messageId.messageId,
                          success: true,
                          token: queryToken
                        });
                      })
                      .catch(err => {
                        console.log(err);
                        res.status(500).send({ error: err, success: false });
                      });
                  })
                  .catch(err => {
                    res.status(400).send({
                      error: err,
                      msg: "error while registering user",
                      success: false
                    });
                  });
              }
            });
          }
        });
      }
    });
  }
});

/*
@route   GET /user/confirmaccount/:token
@desc    confirm email
@access  Public
@requires in token: Email, hashedPassword, _id
*/

user.get("/confirmaccount/:token", (req, res) => {
  const decoded = jwt.verify(req.params["token"], process.env.SECRET_KEY);
  User.findOneAndUpdate(
    { _id: decoded.ID },
    { Confirmed: true },
    (err, response) => {
      if (err) {
        res.status(400).send({ error: err, success: false });
      } else {
        console.log("email confirmed");
        res.status(200).redirect(BaseUrl + "/login?confirmed=true");
      }
    }
  );
});

/*
@route   POST /user/login
@desc    Login a user
@access  Public
@requires: Email, Password
*/

user.post("/login", (req, res) => {
  const requires = ["Email", "Password"];
  if (!arrayIncludes(requires, Object.keys(req.body))) {
    res.status(400).send({ error: "bad request" });
    return;
  }
  const params = {
    Email: req.body.Email,
    Password: req.body.Password
  };
  User.findOne({ Email: params.Email }).then(user => {
    if (!user) {
      res.status(400).send({ success: false });
    } else if (!user.Confirmed) {
      res.status(400).send({ success: false, error: "email not confirmed" });
    } else {
      bcrypt.compare(params.Password, user.Password).then(result => {
        if (!result) {
          res.status(400).send({ success: false });
        } else if (result) {
          res.status(202).send({ success: true });
        } else {
          res.status(400).send({ success: false });
        }
      });
    }
  });
});

/*
@route   POST /user/resetpassword
@desc    reset password
@access  Public
@requires: Email
*/

user.post("/resetpassword/send", (req, res) => {
  const requires = ["Email"];
  if (!arrayIncludes(requires, Object.keys(req.body))) {
    res.status(400).send({ error: "bad request" });
    return;
  }
  const payload = {
    Email: req.body.Email
  };
  let token = jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: 1440
  });
  const Link =
    req.protocol +
    "://" +
    req.get("host") +
    "/user/resetpassword/reset/" +
    token;
  SendResetPassMail(req.body.Email, Link)
    .then(result => {
      res.status(200).send({ success: true });
    })
    .catch(err => {
      res.status(400).send({ success: false, error: err });
    });
});

user.get("/testing", (req, res) => {
  testTemplate()
    .then(result => {
      console.log(result);
      res.send(result);
    })
    .catch(err => {
      console.log(err);
      res.send(err);
    });
});

export default user;
