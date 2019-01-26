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
const SECRET_KEY = process.env.SECRET_KEY;

//--- mongoose Model---
import User from "../models/user";
// initialize route
const user = express.Router();
// use cors for route
user.use(cors());

// external custom functions

import { validate } from "../../customFuncs/validation";
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
@requires: Email, Password, PasswordConf, Language
@optional: Name, Company -- can be empty, but are required
*/

// registers the user in DB with email confirmation = false
user.post("/register", (req, res) => {
  const requires = [
    "Language",
    "Email",
    "Password",
    "PasswordConf",
    "Name",
    "Company"
  ];
  if (!arrayIncludes(requires, Object.keys(req.body))) {
    res.status(400).send({ error: "bad request" });
    return;
  }
  const UserInfo = req.body;

  const error = {};
  // check if userInfo is valid
  const checks = {
    Name: validate("Name", UserInfo.Name),
    Company: validate("Company", UserInfo.Company),
    Email: validate("Email", UserInfo.Email),
    Password: validate("Password", UserInfo.Password),
    ConfPass: validate("ConfPass", UserInfo.PasswordConf, UserInfo.Password)
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
            res.status(500).send({ error: err, success: false });
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
                  error: "Email",
                  success: false
                });
              } else {
                // if user does not exist create new user
                User.create(ToStore)
                  .then(response => {
                    const payload = {
                      Email: response.Email,
                      ID: response._id
                    };
                    let token = jwt.sign(payload, SECRET_KEY, {
                      expiresIn: 1440
                    });
                    const Link =
                      req.protocol +
                      "://" +
                      req.get("host") +
                      "/user/confirmaccount/" +
                      token;
                    SendConfMail(UserInfo.Email, Link, UserInfo.Language)
                      .then(messageId => {
                        const resPayload = {
                          ...payload,
                          Name: response.Name,
                          Company: response.Company
                        };
                        const queryToken = jwt.sign(resPayload, SECRET_KEY, {
                          expiresIn: 1440
                        });
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
                      error: "server",
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
@route   POST /user/resendemail
@desc    resend email
@access  Public
@requires: Email,  Language
*/

user.post("/resendemail", (req, res) => {
  const requires = ["Email", "Language"];
  if (!arrayIncludes(requires, Object.keys(req.body))) {
    res.status(400).send({ error: "bad request" });
    return;
  }
  const Params = req.body;
  User.findOne({ Email: Params.Email }).then(user => {
    if (!user) {
      res.status(400).send({ success: false });
      return;
    } else {
      const payload = {
        Email: user.Email,
        ID: user._id
      };
      let token = jwt.sign(payload, SECRET_KEY, {
        expiresIn: 1440
      });
      const Link =
        req.protocol +
        "://" +
        req.get("host") +
        "/user/confirmaccount/" +
        token;
      SendConfMail(user.Email, Link, Params.Language)
        .then(messageId => {
          res.status(200).send({
            message: "email send again",
            success: true,
            messageId: messageId.messageId
          });
        })
        .catch(err => {
          console.log(err);
          res.status(500).send({ error: err, success: false });
        });
    }
  });
});

/*
@route   POST /user/changeemail
@desc    change email
@access  Public
@requires: newEmail, ID, Password, Language
*/

user.post("/changeemail", (req, res) => {
  const requires = ["newEmail", "Password", "oldEmail", "Language"];
  if (!arrayIncludes(requires, Object.keys(req.body))) {
    res.status(400).send({ error: "bad request" });
    return;
  }
  const Params = req.body;
  User.find({ Email: [Params.oldEmail, Params.newEmail] })
    .then(user => {
      if (!user) {
        res.status(400).send({ success: false, error: "Bad Request" });
      }
      if (user.length > 1) {
        // The email the user wants to chenge to is already registered
        res.status(400).send({ success: false, error: "Email" });
      } else if (user.length === 1) {
        // Email still free
        bcrypt.compare(Params.Password, user[0].Password).then(result => {
          if (!result) {
            // wrong password
            res.status(400).send({ success: false, error: "Authorization" });
          } else if (result) {
            // change Email in DB and reset Confirmed state to false
            user[0].Email = Params.newEmail;
            user[0].Confirmed = false;
            user[0].save(err => {
              if (err) {
                res.status(500).send({ success: false, error: "DB" });
              } else {
                // successfully updated Email
                const payload = {
                  Email: Params.newEmail,
                  ID: Params.ID
                };
                let token = jwt.sign(payload, SECRET_KEY, {
                  expiresIn: 1440
                });
                const Link =
                  req.protocol +
                  "://" +
                  req.get("host") +
                  "/user/confirmaccount/" +
                  token;
                // Send new confirmation Mail
                SendConfMail(Params.newEmail, Link, Params.Language)
                  .then(messageId => {
                    res.status(200).send({
                      message: `email adress changed to ${
                        Params.newEmail
                      } and confirmation mail was send`,
                      success: true,
                      newEmail: Params.newEmail,
                      messageId: messageId.messageId
                    });
                  })
                  .catch(err => {
                    res.status(500).send({
                      error: err,
                      success: false,
                      message: "ConfirmationMail"
                    });
                  });
              }
            });
          } else {
            res.status(400).send({ success: false });
          }
        });
      } else {
        res.status(400).send({ success: false });
      }
    })
    .catch(err => {
      res.status(400).send({ success: false, error: "server" });
    });
});

/*
@route   GET /user/confirmaccount/:token
@desc    confirm email
@access  Public
@requires in token: Email, ID
*/

user.get("/confirmaccount/:token", (req, res) => {
  jwt.verify(req.params.token, SECRET_KEY, (err, decoded) => {
    if (err) {
      res.status(400).send({ success: false, error: "bad request token" });
    } else {
      console.log(decoded);
      const requires = ["Email", "ID"];
      if (!arrayIncludes(requires, Object.keys(decoded))) {
        res.status(400).send({ success: false, error: "bad request" });
        return;
      }
      User.findOne({ Email: decoded.Email, _id: decoded.ID })
        .then(user => {
          if (!user) {
            res
              .status(400)
              .redirect(
                req.protocol + "://" + req.get("host") + "/confirmemailerror"
              );
          } else {
            user.Confirmed = true;
            user.save();
            const Link =
              req.protocol + "://" + req.get("host") + "/login?confirmed=true";
            res.status(200).redirect(Link);
          }
        })
        .catch(err => {
          res.status(400).send({ error: err, success: false });
        });
    }
  });
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
  const params = req.body;
  User.findOne({ Email: params.Email })
    .then(user => {
      if (!user) {
        res.status(400).send({ success: false, error: "Email" });
      } else {
        bcrypt.compare(params.Password, user.Password).then(result => {
          if (!result) {
            res.status(400).send({ success: false, error: "Password" });
          } else if (result) {
            if (!user.Confirmed) {
              res.status(400).send({ success: false, error: "Confirmed" });
              return;
            }
            const payload = {
              ID: user._id,
              Email: user.Email,
              Name: user.Name,
              Company: user.Company
            };
            let token = jwt.sign(payload, SECRET_KEY, {
              expiresIn: 1440
            });
            res.status(202).send({ success: true, token: token });
          } else {
            res.status(400).send({ success: false, error: "Password" });
          }
        });
      }
    })
    .catch(err => {
      res.status(500).send({ success: false, error: "Server" });
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
  let token = jwt.sign(payload, SECRET_KEY, {
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
