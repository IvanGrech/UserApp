import React, { Component } from "react";
import authService from "../services/AuthService";

class UserPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fname: authService.getDecodedToken().firstName,
      lname: authService.getDecodedToken().lastName
    };
  }

  render() {
    return (
      <React.Fragment>
        <h1 id="userFLname">
          Hello, {this.state.fname + " " + this.state.lname}
        </h1>
      </React.Fragment>
    );
  }
}

export default UserPageComponent;
