import axios from "axios";
import * as decode from "jwt-decode";

const URL = "http://10.10.21.239:8080/maven-1.0-SNAPSHOT/";

export const authService = {
  validatePassword,
  login,
  logout,
  getToken,
  getDecodedToken
};

function validatePassword() {
  var passwordId = document.getElementById("passwordId");
  var passwordAgainId = document.getElementById("passwordAgainId");
  if (passwordId.value !== passwordAgainId.value) {
    passwordAgainId.setCustomValidity("Passwords Don't Match");
  } else {
    passwordAgainId.setCustomValidity("");
  }
}

axios.interceptors.request.use(async config => {
  let token = getToken();
  if (token) {
    let bearer = "Bearer " + token;
    config.headers = { Authorization: bearer };
  }
  return config;
});

function login(login, password) {
  this.logout();
  return axios
    .post(URL + "login", {
      login: login,
      password: password
    })
    .then(data => {
      localStorage.setItem("token", data.data.token);
      localStorage.setItem(
        "decodedToken",
        JSON.stringify(decode(data.data.token))
      );
    });
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("decodedToken");
}

function getToken() {
  return localStorage.getItem("token");
}

function getDecodedToken() {
  return JSON.parse(localStorage.getItem("decodedToken"));
}

export default authService;
