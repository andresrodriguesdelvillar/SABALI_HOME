import fetch from "node-fetch";

import { sendinBlue_API } from "../config/secrets";

export const SendConfMail = async (receiver, link) => {
  const body = {
    emailTo: [receiver],
    attributes: { Link: link }
  };
  const options = {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json", "api-key": sendinBlue_API }
  };

  return fetch(
    "https://api.sendinblue.com/v3/smtp/templates/5/send",
    options
  ).then(res => res.json());
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
