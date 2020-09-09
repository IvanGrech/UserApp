import axios from "axios";

const URL = "http://10.10.21.239:8080/maven-1.0-SNAPSHOT/";

export const userService = {
  getAllUsers,
  deleteUser,
  addUser,
  getUserById,
  editUser,
  signup
};

function getAllUsers() {
  return axios.get(URL + "users");
}

function addUser(dto) {
  return axios.post(URL + "users/create", dto);
}

function deleteUser(id) {
  return axios.get(URL + "users/delete/id/" + id);
}

function getUserById(id) {
  return axios.get(URL + "users/id/" + id);
}

function editUser(dto) {
  return axios.post(URL + "users/update", dto);
}

function signup(dto) {
  return axios.post(URL + "signup", dto);
}

export default userService;
