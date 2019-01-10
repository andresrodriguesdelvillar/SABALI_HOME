import React, { Component } from "react";

import "./Admin.scss";

import AdminLogin from "./SubComponents/AdminLogin";
//import LatestWorkAdminForm from "./SubComponents/latestWorkAdminForm";

class Admin extends Component {
  state = {
    loggedIn: false,
    user_id: false,
    adminName: false
  };

  componentWillMount() {
    if (
      localStorage.adminToken &&
      localStorage.admin_id &&
      localStorage.admin_name
    ) {
      this.setState({
        user_id: localStorage.admin_id,
        adminName: localStorage.admin_name,
        loggedIn: true
      });
    }
  }

  componentWillUpdate() {
    if (
      localStorage.adminToken &&
      localStorage.admin_id &&
      localStorage.admin_name
    ) {
      this.setState({
        user_id: localStorage.admin_id,
        adminName: localStorage.admin_name,
        loggedIn: true
      });
    }
  }

  onLogout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    this.forceUpdate();
  };

  render() {
    if (
      this.state.loggedIn !== false ||
      this.state.user_id !== false ||
      this.state.adminName !== false
    ) {
      return (
        <div className="container">
          <div id="LogoutButton">
            <button onClick={this.onLogout} className="btn btn-danger">
              Logout
            </button>
          </div>
          <div id="main-container">
            <div id="latestWork">
              <div className="wrapper">
                <div className="title">
                  <h5 className="titleText">Latest Work Upload</h5>
                </div>
              </div>
              {/* <LatestWorkAdminForm /> */}
            </div>
          </div>
        </div>
      );
    } else {
      return <AdminLogin />;
    }
  }
}

export default Admin;
