import { input } from "../components/input.js";
import { login } from "../services/session-service.js"
import DOMHandler from "../dom-handler.js";
import BoardsPage from "./boards-page.js";
import STORE from "../store.js";
import SignupPage from "./signup-page.js";
import { getBoards } from "../services/boards-service.js"

function render() {
  return `
    <section class="section-lg">
      <div class="container flex flex-column gap-8 items-center">
        <img src="/assets/images/organizable-logo.png" alt="rankable logo" />
        <h1 class="heading">Login</h1>
        <form action="" class="full-width container-sm flex flex-column gap-4 js-login-form">
          
          ${input({
            label: "Username",
            icon: "/assets/icons/user.svg",
            id: "username",
            required: true,
            error: this.state.errors.username,
            value: "leninraul"
          })}

          ${input({
            label: "password",
            icon: "/assets/icons/password.svg",
            id: "password",
            required: true,
            error: this.state.errors.password,
            type: "password",
            placeholder: "password",
            value: "123456"
          })}

          <button type="submit" class="button button--secondary width-full">
            Login
          </button>
        </form>

        ${this.state.errors.message ? 
          `<p class="error-300">${this.state.errors.message}</p>`
          :
          ""
        }
        <a href="#" class="js-create-account">Create Account</a>
      </div>
    </section>
  `
}

function listenSubmit() {
  const form = document.querySelector(".js-login-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const { username, password } = event.target;
    const credentials = {
      username: username.value,
      password: password.value
    }

    try {
      await login(credentials)
      // sessionStorage.setItem(tokenKey, token);

      STORE.setCurrentPage("boards")

      const boards = await getBoards();
      STORE.setBoards(boards);

      DOMHandler.load(BoardsPage(), document.querySelector("#root"));
    } catch (error) {
      let formErrors = JSON.parse(error.message)
      this.state.errors = formErrors;
      DOMHandler.reload()
    }
  })
}

function listenCreateAccount() {
  const link = document.querySelector(".js-create-account")

  link.addEventListener("click", event => {
    event.preventDefault();

    STORE.setCurrentPage("signup");
    DOMHandler.load(SignupPage(), document.querySelector("#root"));
  })
}

function LoginPage() {
  return {
    toString() {
      return render.call(this);
    },
    addListeners() {
      listenSubmit.call(this);
      listenCreateAccount();
    },
    state: {
      errors: {},
    }
  }
}

export default LoginPage;