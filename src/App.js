import React from "react";
import "./App.css";
import NavbarComponent from "./components/navbarComponent";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import UserPageComponent from "./components/userPageComponent";
import LoginComponent from "./components/loginComponent";
import SignUpComponent from "./components/signupComponent";
import AdminPageComponent from "./components/admin/adminPageComponent";
import authService from "./services/AuthService";
import PageNotFoundComponent from "./components/pageNotFoundComponent";
import AddPageComponent from "./components/admin/addPageComponent";
import EditPageComponent from "./components/admin/editPageComponent";
import UserNavbarComponent from "./components/userNavbarComponent";
import GuestNavbarComponent from "./components/guestNavbarComponent";

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authService.getDecodedToken() != null ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

const AdminAuthRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      authService.getDecodedToken() != null &&
      authService.getDecodedToken().role === "admin" ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login" }} />
      )
    }
  />
);

export function update() {
  if (authService.getDecodedToken() != null) {
    this.setState({ isLoggedIn: true });
    this.setState({ fname: authService.getDecodedToken().firstName });
    this.setState({ lname: authService.getDecodedToken().lastName });
    this.setState({ role: authService.getDecodedToken().role });
  }
}

function App() {
  return (
    <Router basename="/react">
      <div className="App">
        <Switch>
          <UserNavbarComponent path="/home" />
          <NavbarComponent path="/admin" />
          <GuestNavbarComponent path="/" />
        </Switch>
        <Switch>
          <AdminAuthRoute path="/admin" exact component={AdminPageComponent} />
          <AdminAuthRoute
            path="/admin/add"
            exact
            component={AddPageComponent}
          />
          <AdminAuthRoute path="/admin/edit/" component={EditPageComponent} />
          <AuthRoute path="/home" component={UserPageComponent} />
          <Route path="/login" exact component={LoginComponent} />
          <Route path="/signup" exact component={SignUpComponent} />
          <Route path="/" exact component={LoginComponent} />
          <Route path="**" component={PageNotFoundComponent} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
