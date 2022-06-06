import { tokenKey, userDetail } from "../config.js";
import apiFetch from "./api-fetch.js";
import STORE from "../store.js";

export async function createUser(newUser = {
  username,
  email,
  first_name,
  last_name,
  password
}) {

  const {token, ...user} = await apiFetch("users", { body: newUser });
  sessionStorage.setItem(tokenKey, token)
  sessionStorage.setItem(userDetail,JSON.stringify(user))
  STORE.setUser()
  return user;
}

export async function updateUser(id, payload = {
  username,
  email,
  first_name,
  last_name
}) {
  const {token, ...user} = await apiFetch("users/" + id, {
    method: "PATCH",
    body: payload 
  });
  sessionStorage.setItem(tokenKey, token)
  sessionStorage.setItem(userDetail,JSON.stringify(user))
  STORE.setUser()
  return user;
}

export async function getUser(id) {
  const {token, ...user} = await apiFetch("users/" + id);
  sessionStorage.setItem(tokenKey, token)
  sessionStorage.setItem(userDetail,JSON.stringify(user))
  STORE.setUser()
  return user;
}

export async function deleteUser(id) {
  await apiFetch("users/" + id, {
    method: "DELETE"
  });
  sessionStorage.removeItem(tokenKey)
  sessionStorage.removeItem(userDetail)
  STORE.user = null
}


