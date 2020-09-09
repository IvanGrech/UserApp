import React, { Component } from "react";

import { Link } from "react-router-dom";
import authService from "../../services/AuthService";
import userService from "../../services/UserService";

class AddPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: "",
      password: "",
      repeatPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      birthday: "",
      role: { name: "user", id: 2 },
      errors: []
    };

    this.change = this.change.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
  }

  validate() {
    authService.validatePassword();
  }

  change(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
    if (
      event.target.name === "password" ||
      event.target.name === "repeatPassword"
    ) {
      this.validate();
    }
  }

  changeCaptcha(value) {
    this.setState({ captcha: value });
  }

  handleAdd(event) {
    let dto = {
      id: 0,
      login: this.state.login,
      password: this.state.password,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birthday: this.state.birthday,
      role: {
        id: this.state.role === "admin" ? 1 : 2,
        name: this.state.role.name
      }
    };

    userService
      .addUser(dto)
      .then(resp => {
        this.props.history.push("/admin");
      })
      .catch(err => {
        this.setState({ errors: err.response.data });
      });

    event.preventDefault();
  }

  render() {
    return (
      <React.Fragment>
        <header>Add User</header>
        <form onSubmit={this.handleAdd}>
          <div className="form-group row">
            <label htmlFor="loginId" className="col-sm-2 col-form-label">
              Login
            </label>
            <div className="col-sm-3">
              <input
                className="form-control"
                name="login"
                pattern="[A-Za-z0-9_]{4,16}"
                onChange={this.change}
                required
              />
              <p id="loginError">
                Login must be 4-16 characters long. No Spaces
              </p>
              <p className="errorMessage">{this.state.errors.login}</p>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="passwordId" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-3">
              <input
                type="password"
                className="form-control"
                id="passwordId"
                name="password"
                pattern="[A-Za-z0-9]{4,16}"
                onChange={this.change}
                required
              />
              <p className="errorMessage">{this.state.errors.password}</p>
            </div>
          </div>
          <div className="form-group row">
            <label
              htmlFor="passwordAgainId"
              className="col-sm-2 col-form-label"
            >
              Password again
            </label>
            <div className="col-sm-3">
              <input
                type="password"
                className="form-control"
                id="passwordAgainId"
                name="repeatPassword"
                pattern="[A-Za-z0-9]{4,16}"
                onKeyUp={this.change}
                required
              />
              <p id="repeatPasswordError">Passwords must match</p>
              <p className="errorMessage">{this.state.errors.repeatPassword}</p>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="emailId" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-3">
              <input
                type="email"
                className="form-control"
                id="emailId"
                name="email"
                pattern="[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+"
                onChange={this.change}
                required
              />
              <span></span>
              <p className="errorMessage">{this.state.errors.email}</p>
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="firstNameId" className="col-sm-2 col-form-label">
              First Name
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                id="firstNameId"
                name="firstName"
                pattern="[A-Za-z]{2,32}"
                onChange={this.change}
                required
              />
              <span></span>
              <p className="errorMessage">{this.state.errors.firstName}</p>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="lastNameId" className="col-sm-2 col-form-label">
              Last Name
            </label>
            <div className="col-sm-3">
              <input
                type="text"
                className="form-control"
                id="lastNameId"
                name="lastName"
                pattern="[A-Za-z]{2,32}"
                onChange={this.change}
                required
              />
              <span></span>
              <p className="errorMessage">{this.state.errors.lastName}</p>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="birthdayId" className="col-sm-2 col-form-label">
              Birthday
            </label>
            <div className="col-sm-3">
              <input
                type="date"
                className="form-control"
                id="birthdayId"
                name="birthday"
                min="1950-01-01"
                max="2010-01-01"
                onChange={this.change}
                required
              />
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="roleSelect" className="col-sm-2 col-form-label">
              Role
            </label>
            <div className="col-sm-3">
              <select name="role" id="roleSelect" onChange={this.change}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-2">
              <button type="submit" className="btn btn-primary">
                Ok
              </button>
              <Link to="/admin">
                <button className="btn btn-secondary">Cancel</button>
              </Link>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default AddPageComponent;
