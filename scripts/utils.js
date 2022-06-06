import { appKey } from "./config.js";
import LoginPage from "./pages/login-page.js"; 
import SignupPage from "./pages/signup-page.js"; 
import BoardsPage from "./pages/boards-page.js"; 
import ProfilePage from "./pages/profile-page.js"; 
import ListsPage from "./pages/lists-page.js";

export function fromLocalStorage(key) {
  const data = JSON.parse(localStorage.getItem(appKey)) || {};
  return data[key];
}

export function saveToLocalStorage(key, value) {
  let data = JSON.parse(localStorage.getItem(appKey)) || {};
  data = { ...data, [key]: value };
  localStorage.setItem(appKey, JSON.stringify(data));
}

export function emailValidator(email) {
  const validRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  if (validRegex.test(email)==false) {
    throw new Error(JSON.stringify({"email":["is not a valid email"]}))
  }
}

export const router = {
  "login": LoginPage,
  "signup": SignupPage,
  "boards": BoardsPage,
  "closed": BoardsPage,
  "profile": ProfilePage,
  "lists": ListsPage,
}