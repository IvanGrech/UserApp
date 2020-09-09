import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./css/navbarComponent.css";
import authService from "../services/AuthService";

class GuestNavbarComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <React.Fragment>
        <nav id="navbar" className="navbar navbar-expand-lg navbar-light">
          <p className="navbar-brand">
            <img src="./logo192.png" alt="fav" id="fav" />
          </p>
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
              <Link to="/signup" className="nav-link">
                <li className="nav-item">Sign Up</li>
              </Link>

              <Link to="/login" className="nav-link">
                <li className="nav-item">Login</li>
              </Link>
            </ul>
          </div>
        </nav>
      </React.Fragment>
    );
  }
}

export default GuestNavbarComponent;
