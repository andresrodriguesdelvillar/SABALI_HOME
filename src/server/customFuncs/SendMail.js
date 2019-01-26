import fetch from "node-fetch";

import { sendinBlue_API } from "../config/secrets";

export const SendConfMail = async (receiver, link, language) => {
  const body = {
    emailTo: [receiver],
    attributes: { Link: link, Email: receiver }
  };
  const options = {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", "api-key": sendinBlue_API }
  };
  switch (language) {
    case "de":
      return fetch(
        `https://api.sendinblue.com/v3/smtp/templates/7/send`,
        options
      ).then(res => res.json());
    case "nl":
      return fetch(
        `https://api.sendinblue.com/v3/smtp/templates/8/send`,
        options
      ).then(res => res.json());
    case "es":
      return fetch(
        `https://api.sendinblue.com/v3/smtp/templates/9/send`,
        options
      ).then(res => res.json());
    default:
      return fetch(
        `https://api.sendinblue.com/v3/smtp/templates/5/send`,
        options
      ).then(res => res.json());
  }
};

export const SendResetPassMail = async (receiver, link) => {
  const body = {
    emailTo: [receiver],
    attributes: { Link: link, Email: receiver }
  };
  const options = {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", "api-key": sendinBlue_API }
  };

  return fetch(
    "https://api.sendinblue.com/v3/smtp/templates/6/send",
    options
  ).then(res => res.json());
};
