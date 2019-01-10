import React, { Component } from "react";

import jwt_decode from "jwt-decode";

class AdminLogin extends Component {
  state = {
    name: "",
    password: ""
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onLogin = e => {
    e.preventDefault();
    const user = {
      name: this.state.name,
      password: this.state.password
    };

    fetch("http://localhost:5000/admin/login", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(user)
    })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        localStorage.adminToken = response.jwt;
        const decoded = jwt_decode(response.jwt);
        console.log(decoded._id);
        localStorage.admin_id = decoded._id;
        localStorage.admin_name = decoded.name;

        //   _id: decoded._id,
        //   name: decoded.name
        // };

        this.forceUpdate();
      })
      .catch(err => console.log(err));
  };

  render() {
    return (
      <div className="conatainer">
        <button
          type="button"
          className="btn btn-info btn-lg"
          id="AdminLoginButton"
          data-toggle="modal"
          data-target="#myModal"
        >
          Admin Login
        </button>

        <div id="myModal" className="modal fade" tabIndex="-1" role="dialog">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Admin Login</h5>
                <button className="close" type="button" data-dismiss="modal">
                  &times;
                </button>
              </div>
              <div className="modal-body">
                <form noValidate method="POST">
                  <label htmlFor="name" className="">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="form-control"
                    placeholder="Your Name"
                    onChange={this.onChange}
                  />
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                    placeholder="your Password"
                    onChange={this.onChange}
                  />
                  <button
                    type="button"
                    onClick={this.onLogin}
                    className="btn btn-primary mt-2"
                  >
                    Login
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  data-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminLogin;
