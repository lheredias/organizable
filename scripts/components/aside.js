import { input } from "../components/input.js";
import { login, logout } from "../services/session-service.js"
import { tokenKey } from "../config.js"
import { router } from "../utils.js"

import DOMHandler from "../dom-handler.js"
import LoginPage from "../pages/login-page.js"
import ProfilePage from "../pages/profile-page.js"
import STORE from "../store.js";

function renderHeader() {
  return `
    <header class="header">
      <h1><img src="/assets/images/organizable-logo.png" alt="organizable" /></h1>
    </header>
    `;
}

function render() {
  return  `
    <aside class="aside-wrapper">
      <div class="aside">
        ${renderHeader()}
        <ul>
          <li data-value="boards" class="selected">
            <a href="#boards">
              <img
                src="/assets/icons/boards.svg"
                class="aside__icon"
              />
              My Boards
            </a>
          </li>
          <li data-value="closed">
            <a href="#closed">
              <img
                src="/assets/icons/closed.svg"
                class="aside__icon"
              />
              Closed Boards
            </a>
          </li>
          <li data-value="profile">
            <a href="#profile">
              <img
                src="/assets/icons/user.svg"
                class="aside__icon"
              />
              My Profile
            </a>
          </li>
        </ul>
      </div>
      <div class="aside">
        <ul>
          <li data-value="logout">
            <a href="#logout">
              <img
                src="/assets/icons/logout.svg"
                class="aside__icon" style="color:#E76A94"
              />
              Log out
            </a>
          </li>
        </ul>
      </div>
    </aside>
    `;
}

function setSelectedAsideItem() {
  const items = document.querySelectorAll(".aside li");
  const selectedItem = Array.from(items).find(
    (item) => item.dataset.value === STORE.currentPage
  );
  items.forEach((item) => item.classList.remove("selected"));
  selectedItem.classList.add("selected");
}

function listenAsideClick() {
  const anchors = document.querySelectorAll(".aside a");
  anchors.forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      event.preventDefault();
      // setSelectedAsideItem();
      let currentPage = anchor.closest("li").dataset.value;
      STORE.setCurrentPage(currentPage)
      let module = router[STORE.currentPage]
      // DOMHandler.reload()
      DOMHandler.load(module(), document.querySelector("#root"));
      // loadContent();
    });
  });
}

function listenLogout() {
  const logoutLink = document.querySelector('[data-value="logout"]')
  logoutLink.addEventListener("click", async (event) => {
    try {
      event.preventDefault()
      await logout()
      DOMHandler.load(LoginPage(), document.querySelector("#root"))
    } catch(error) {
      console.log(error)
      DOMHandler.reload()
    }
  })
}

function AsideView() {
  return {
    toString() {
      return render.call(this);
    },
    addListeners() {
      setSelectedAsideItem();
      listenAsideClick();
      listenLogout();
    },
  }
}

export default AsideView;