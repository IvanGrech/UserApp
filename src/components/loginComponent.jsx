import React, { Component } from "react";
import authService from "../services/AuthService.js";
import "./css/loginComponent.css";
import NavbarComponent from "./navbarComponent";
import AdminPageComponent from "./admin/adminPageComponent.jsx";
import * as app from "../App";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      errors: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.loginChangeHandler = this.loginChangeHandler.bind(this);
    this.passwordChangeHandler = this.passwordChangeHandler.bind(this);
  }

  loginChangeHandler(event) {
    this.setState({ login: event.target.value });
  }
  passwordChangeHandler(event) {
    this.setState({ password: event.target.value });
  }

  handleSubmit(event) {
    authService
      .login(this.state.login, this.state.password)
      .then(() => {
        if (authService.getDecodedToken().role === "admin")
          this.props.history.push("/admin");
        else this.props.history.push("/home");
      })
      .catch(() => {
        this.setState({ errors: true });
      });
    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <div className="centered">
          <div>
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row" id="loginInputDiv">
                <label className="col-sm-2 col-form-label">Login:</label>
                <div className="col-sm-3">
                  <input
                    value={this.state.login}
                    onChange={this.loginChangeHandler}
                    type="text"
                    id="login"
                    name="login"
                    pattern="[a-zA-Z0-9_-]{1,}"
                    required
                  />
                </div>
              </div>

              <div className="form-group row" id="loginInputDiv">
                <label className="col-sm-2 col-form-label">Password:</label>
                <div className="col-sm-3">
                  <input
                    value={this.state.password}
                    onChange={this.passwordChangeHandler}
                    id="password"
                    type="password"
                    name="password"
                    pattern="[a-zA-Z0-9_-]{1,}"
                    required
                  />
                </div>
              </div>
              {this.state.errors ? (
                <div className="alert alert-danger" role="alert" align="center">
                  Login or password is incorrect
                </div>
              ) : null}

              <div className="loginButtons">
                <button className="btn btn-primary btn-lg">
                  <input type="submit" hidden />
                  Sign in
                </button>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default LoginComponent;
