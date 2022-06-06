import { tokenKey, userDetail } from "../config.js"
import STORE from "../store.js"
import apiFetch from "./api-fetch.js"
 
export async function login(credentials = { username, password }) {
  const {token, ...user} = await apiFetch("login", { body: credentials })
  sessionStorage.setItem(tokenKey, token)
  sessionStorage.setItem(userDetail,JSON.stringify(user))
  STORE.setUser()
  return user;
}

export async function logout(){
  const data = await apiFetch("logout", { method: "POST" })
  sessionStorage.removeItem(tokenKey)
  sessionStorage.removeItem(userDetail)
  STORE.user = null
  return data
}