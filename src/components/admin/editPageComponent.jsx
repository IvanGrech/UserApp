import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/UserService";
import authService from "../../services/AuthService";

class EditPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      login: "",
      password: "",
      repeatPassword: "",
      email: "",
      firstName: "",
      lastName: "",
      birthday: "",
      role: "",
      errors: []
    };
    var editedUserid = window.location.pathname.split("/").pop();

    userService
      .getUserById(editedUserid)
      .then(resp => {
        this.setState({
          login: resp.data.login,
          email: resp.data.email,
          firstName: resp.data.firstName,
          lastName: resp.data.lastName,
          birthday: resp.data.birthday,
          role: resp.data.role.name,
          id: resp.data.id
        });
      })
      .catch(err => {
        this.props.history.push("/admin");
      });
    this.change = this.change.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  validate() {
    authService.validatePassword();
  }

  parseDate(date) {
    var mm = date.getMonth() + 1;
    var dd = date.getDate();
    return [
      date.getFullYear(),
      (mm > 9 ? "" : "0") + mm,
      (dd > 9 ? "" : "0") + dd
    ].join("-");
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

  handleEdit(event) {
    let dto = {
      id: this.state.id,
      login: this.state.login,
      password: this.state.password,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      birthday: this.state.birthday,
      role: { name: this.state.role, id: this.state.role === "admin" ? 1 : 2 }
    };
    userService
      .editUser(dto)
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
        <header>Edit User</header>
        <form onSubmit={this.handleEdit}>
          <div className="form-group row">
            <label htmlFor="loginId" className="col-sm-2 col-form-label">
              Login
            </label>
            <div className="col-sm-3">
              <input
                className="form-control"
                id="loginId"
                name="login"
                value={this.state.login}
                readOnly
              />
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
                value={this.state.email}
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
                value={this.state.firstName}
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
                value={this.state.lastName}
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
                value={this.parseDate(new Date(this.state.birthday))}
                required
              />
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="roleSelect" className="col-sm-2 col-form-label">
              Role
            </label>
            <div className="col-sm-3">
              <select
                name="role"
                id="roleSelect"
                value={this.state.role.name}
                onChange={this.change}
              >
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
              <Link to="/admin">Cancel</Link>
            </div>
          </div>
        </form>
      </React.Fragment>
    );
  }
}

export default EditPageComponent;
