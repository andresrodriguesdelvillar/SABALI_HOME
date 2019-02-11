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
import { generator as PwdGenerator } from "generate-password";

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
import { arrayIncludes } from "../../customFuncs/checks";
import {
  SendConfMail,
  SendResetPassMail,
  testTemplate
} from "../customFuncs/SendMail";

// custom imports
import { tokenExpires } from "../config/main";

// ROUTES

/*
@route   POST /user/register
@desc    Register a user
@access  Public
@requires: Email, Password, PasswordConf, Language
@optional: Name, Company -- can be empty, but are required
*/

// registers the user in DB with email confirmation = false
// and send confirmation mail
user.post("/register", (req, res) => {
  console.log(req.body);
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
  // check if userInfo is valid
  const error = {};
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
    // if userInfo includes errors respond with errors
    res.status(400).send({ error: error });
  } else {
    // if no errors
    // => hash password
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        // error during salt creation
        res.status(500).send({ error: err });
      } else {
        // => hashing password
        bcrypt.hash(UserInfo.Password, salt, (err, hash) => {
          if (err) {
            // error during hashing
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
            User.findOne({ Email: ToStore.Email })
              .then(user => {
                if (user) {
                  // if user exists respond with error = 'Email'
                  res.status(200).send({
                    error: "Email",
                    success: false
                  });
                } else {
                  // if user does not exist
                  // => create new user
                  User.create(ToStore)
                    .then(response => {
                      // create payload for token included in Confirmation mail
                      const payload = {
                        Email: response.Email,
                        ID: response._id
                      };
                      // create jwt token
                      let token = jwt.sign(payload, SECRET_KEY, {
                        expiresIn: tokenExpires.confirmationMail
                      });
                      // create Link for confirmation Mail
                      const Link =
                        req.protocol +
                        "://" +
                        req.get("host") +
                        "/user/confirmaccount/" +
                        token;
                      // send confirmation mail
                      SendConfMail(UserInfo.Email, Link, UserInfo.Language)
                        .then(messageId => {
                          // create payload for jwt-token for response
                          const resPayload = {
                            ...payload,
                            Name: response.Name,
                            Company: response.Company
                          };
                          // create response token
                          const responseToken = jwt.sign(
                            resPayload,
                            SECRET_KEY,
                            {
                              expiresIn: tokenExpires.confirmationMail
                            }
                          );
                          // Successfull response
                          // User created and confirmation mail sent
                          res.status(202).send({
                            messageId: messageId.messageId,
                            success: true,
                            token: responseToken
                          });
                        })
                        .catch(err => {
                          // error while sending confirmation mail
                          console.log(err);
                          res.status(500).send({
                            error: err,
                            message: "ConfirmationMail",
                            success: false
                          });
                        });
                    })
                    .catch(err => {
                      // error while creating the user
                      // => respond with error = 'Server'
                      res.status(500).send({
                        error: "Server",
                        msg: "error while registering user",
                        success: false
                      });
                    });
                }
              })
              .catch(err => {
                res.status(500).send({
                  // error while looking for User
                  // => respond with error = 'Server'
                  error: "Server",
                  msg: "error while looking for User",
                  success: false
                });
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
  console.log(req.body);
  // check if request body is valid
  const requires = ["Email", "Language"];
  if (!arrayIncludes(requires, Object.keys(req.body))) {
    res.status(400).send({ error: "bad request" });
    return;
  }
  const Params = req.body;
  // find User
  User.findOne({ Email: Params.Email })
    .then(user => {
      if (!user) {
        // User not found
        res.status(400).send({ success: false, error: "Email" });
        return;
      } else {
        // create payload for jwt-token user in confirmation mail
        const payload = {
          Email: user.Email,
          ID: user._id
        };
        // create jwt-token for confirmationmail
        let token = jwt.sign(payload, SECRET_KEY, {
          expiresIn: tokenExpires.confirmationMail
        });
        // construct Link for confirmation mail
        const Link =
          req.protocol +
          "://" +
          req.get("host") +
          "/user/confirmaccount/" +
          token;
        // send confirmation mail
        SendConfMail(user.Email, Link, Params.Language)
          .then(messageId => {
            // successful response
            // => email was changed and new confirmation mail sent
            res.status(200).send({
              message: "email send again",
              success: true,
              messageId: messageId.messageId
            });
          })
          .catch(err => {
            // error while sending confirmation mail
            res.status(500).send({ error: err, success: false });
          });
      }
    })
    .catch(err => {
      // error while looking for user
      res.status(500).send({ error: "Server", success: false });
    });
});

/*
@route   POST /user/changeemail
@desc    change email
@access  Public
@requires: newEmail, oldEmail, Password, Language
*/

user.post("/changeemail", (req, res) => {
  console.log(req.body);
  // check if request pody is valid
  const requires = ["newEmail", "Password", "oldEmail", "Language"];
  if (!arrayIncludes(requires, Object.keys(req.body))) {
    console.log("wrong params");
    res.status(400).send({ error: "bad request" });
    return;
  }
  const Params = req.body;
  // Look if user exists
  User.find({ Email: [Params.oldEmail, Params.newEmail] })
    .then(user => {
      if (!user) {
        // if user does not exist response with error = 'Bad Request'
        res.status(400).send({ success: false, error: "Bad Request" });
      }
      if (user.length > 1) {
        // The email the user wants to change to is already registered
        res.status(400).send({ success: false, error: "Email" });
      } else if (user.length === 1) {
        // Email still free
        // => check if password is valid
        bcrypt.compare(Params.Password, user[0].Password).then(result => {
          if (!result) {
            // wrong password
            // => response with Authorization error
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
                // => create payload for jwt token
                const payload = {
                  Email: Params.newEmail,
                  ID: user[0]._id
                };
                // create jwt-token for confirmation mail
                let token = jwt.sign(payload, SECRET_KEY, {
                  expiresIn: tokenExpires.confirmationMail
                });
                // construct link for confirmation mail
                const Link =
                  req.protocol +
                  "://" +
                  req.get("host") +
                  "/user/confirmaccount/" +
                  token;
                // Send new confirmation Mail
                SendConfMail(Params.newEmail, Link, Params.Language)
                  .then(messageId => {
                    // successfull response
                    // Email adres changed and new confirmation mail send
                    res.status(200).send({
                      success: true,
                      newEmail: Params.newEmail,
                      messageId: messageId.messageId
                    });
                  })
                  .catch(err => {
                    // error while sending confirmation mail
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
        res.status(400).send({ success: false, error: "no user found" });
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
  // verify jwt token
  jwt.verify(req.params.token, SECRET_KEY, (err, decoded) => {
    if (err) {
      // error verifying jwt-token
      // => response with error = 'bad request token'
      if (err.name === "TokenExpiredError") {
        const payload = jwt.decode(req.params.token);
        res
          .status(400)
          .redirect(
            req.protocol +
              "://" +
              req.get("host") +
              "/confirmemailerror?error=tokenExpired&email=" +
              payload.Email
          );
        return;
      }
      res.status(400).send({ success: false, error: "bad request token" });
    } else {
      // verification success
      // => check if token has required values
      const requires = ["Email", "ID"];
      if (!arrayIncludes(requires, Object.keys(decoded))) {
        res.status(400).send({ success: false, error: "bad request" });
        return;
      }
      // find user in DB
      User.findOne({ _id: decoded.ID })
        .then(user => {
          if (!user) {
            // user does not exist
            // => responde with bad request
            res.status(400).send({ success: false, error: "bad request" });
          } else if (user.Email !== decoded.Email) {
            res
              .status(400)
              .redirect(
                req.protocol +
                  "://" +
                  req.get("host") +
                  "/confirmemailerror?error=emailUnknown&email=" +
                  user.Email
              );
          } else {
            // user does exist and Email is write
            // => set Confirmed = true
            user.Confirmed = true;
            user.save();
            // construct Link to redirect to
            if (process.env.NODE_ENV === "development") {
              const Link = "http://localhost:3000/login?email=" + user.Email;
              res.status(200).redirect(Link);
            } else {
              const Link =
                req.protocol +
                "://" +
                req.get("host") +
                "/login?email=" +
                user.Email;
              res.status(200).redirect(Link);
            }
          }
        })
        .catch(err => {
          // error while looking for the user
          res.status(400).send({ error: "Server", success: false });
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
  // check if required values in request body
  const requires = ["Email", "Password"];
  if (!arrayIncludes(requires, Object.keys(req.body))) {
    res.status(400).send({ error: "bad request" });
    return;
  }
  const params = req.body;
  // look for user (by Email)
  User.findOne({ Email: params.Email })
    .then(user => {
      if (!user) {
        // User does not exist
        res.status(400).send({ success: false, error: "Email" });
      } else {
        // user exists
        // => check password
        bcrypt.compare(params.Password, user.Password).then(result => {
          if (!result) {
            // wrong password
            res.status(400).send({ success: false, error: "Password" });
          } else if (result) {
            // right password
            // => check if user Email is confirmed
            if (!user.Confirmed) {
              // user not confirmed
              // => respond with error = 'Confirmed'
              res.status(400).send({ success: false, error: "Confirmed" });
              return;
            } else if (user.Confirmed === true) {
              // user found, password right and user confirmed
              // => create payload for reponse
              const payload = {
                ID: user._id,
                Email: user.Email,
                Name: user.Name,
                Company: user.Company
              };
              // create jwt-token for user authorization
              let token = jwt.sign(payload, SECRET_KEY, {
                expiresIn: tokenExpires.userAuth
              });
              res.status(202).send({ success: true, token: token });
            }
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
@requires: Email, Language
*/

user.post("/resetpassword/send", (req, res) => {
  const requires = ["Email"];
  if (!arrayIncludes(requires, Object.keys(req.body))) {
    res.status(400).send({ error: "bad request" });
    return;
  }

  const newPwd = PwdGenerator({
    length: 8,
    numbers: true
  });

  const response = {};

  User.findOne({ Email: req.body.Email }).then(user => {
    if (!user) {
      res.status(400).send({ success: false, error: "notFound" });
    } else if (user) {
      user.Password = newPwd;
      user.save();
      response.success = true;
    } else {
      res.status(500).send({ success: false, error: "Server" });
    }
  });

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

  if (response.success === true) {
    SendResetPassMail(req.body.Email, Link, newPwd, req.body.Language)
      .then(result => {
        res.status(200).send({ success: true });
      })
      .catch(err => {
        res.status(400).send({ success: false, error: err });
      });
  }
});

export default user;
