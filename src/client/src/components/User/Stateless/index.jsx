import React from "react";

import { TextField, Button } from "@material-ui/core";

import "./style.scss";

export const ConfirmEmail = props => {
  let Email = "";
  const token = props.location.search.substring(1);
  const email = "bla@bla.com";
  const submit_newEmail = e => {
    e.preventDefault();
    console.log(Email);
    console.log("change Email in Backend");
  };
  const resendEmail = () => {
    console.log("resend Email");
  };
  const changeEmail_text = "change Email";
  const onChange = e => {
    Email = e.target.value;
  };
  return (
    <div id="confirmEmail">
      <div className="container">
        <h3>We have sent an email to {email}</h3>
        <h4>Did not receive an Email</h4>
        <div id="resendEmail" onClick={resendEmail}>
          <Button color="primary" variant="contained">
            resend Email
          </Button>
        </div>

        <form noValidate onSubmit={submit_newEmail}>
          <h4>The Email is wrong, or you do not have access to it</h4>
          <TextField
            style={{ marginBottom: "1.5em" }}
            required
            type="email"
            id="Email"
            label="Email"
            onChange={onChange}
          />
          <Button color="primary" variant="contained" type="submit">
            {changeEmail_text}
          </Button>
        </form>
      </div>
    </div>
  );
};
