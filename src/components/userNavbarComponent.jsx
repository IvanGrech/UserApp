import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/navbarComponent.css";
import authService from "../services/AuthService";

class UserNavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      fname: "",
      lname: "",
      role: ""
    };

    this.handleLogout = this.handleLogout.bind(this);
    let token = authService.getDecodedToken();
    if (token != null) {
      this.state.isLoggedIn = true;
      this.state.fname = token.firstName;
      this.state.lname = token.lastName;
      this.state.role = token.role;
    }
  }

  handleLogout(event) {
    authService.logout();
    this.setState({ fname: "" });
    this.setState({ lname: "" });
    this.setState({ role: "" });
    this.setState({ isLoggedIn: false });
  }

  render() {
    return (
      <React.Fragment>
        <nav id="navbar" className="navbar navbar-expand-lg navbar-light">
          <p className="navbar-brand">
            <img src="./logo192.png" alt="fav" id="fav" />
          </p>
          <span className="badge badge-secondary m-2">
            {this.state.role.charAt(0).toUpperCase() +
              this.state.role.substring(1)}
          </span>
          <p id="userName">{this.state.fname + " " + this.state.lname}</p>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="nav navbar-nav ml-auto w-100 justify-content-end">
              <Link to="/home" className="nav-link">
                <li className="nav-item">Home</li>
              </Link>
              <Link
                to="/login"
                onClick={this.handleLogout}
                className="nav-link"
              >
                <li className="nav-item">Logout</li>
              </Link>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default UserNavbarComponent;
