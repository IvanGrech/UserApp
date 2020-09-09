import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/UserService";

class AdminPageComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    };
    this.deleteUser = this.deleteUser.bind(this);
    userService.getAllUsers().then(response => {
      this.setState({ users: response.data });
    });
  }

  deleteUser(event) {
    var res = window.confirm("Are you sure?");
    if (res) {
      var id = event.target.value;
      userService.deleteUser(id).then(resp => {
        userService.getAllUsers().then(response => {
          this.setState({ users: response.data });
        });
      });
    }
    event.preventDefault();
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

  render() {
    return (
      <React.Fragment>
        <table className="table table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Login</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Birthday</th>
              <th scope="col">Role</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.users.map((user, id) => (
              <tr key={id}>
                <td>{user.login}</td>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{this.parseDate(new Date(user.birthday))}</td>
                <td>{user.role.name}</td>
                <td>
                  <form>
                    <input type="hidden" name="id" value={user.id} />
                    <Link to={"/admin/edit/" + user.id}>
                      <button className="btn btn-primary" value={user.id}>
                        Edit
                      </button>
                    </Link>
                    <button
                      className="btn btn-danger delete-button"
                      value={user.id}
                      onClick={this.deleteUser}
                    >
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

export default AdminPageComponent;
