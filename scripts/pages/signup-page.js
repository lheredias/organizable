import { input } from "../components/input.js";
import { createUser } from "../services/users-service.js"
import DOMHandler from "../dom-handler.js";
import BoardsPage from "./boards-page.js";
import STORE from "../store.js";
import LoginPage from "./login-page.js";
import { getBoards } from "../services/boards-service.js";
import { emailValidator } from "../utils.js";

function render() {
  return `
    <section class="section-lg">
      <div class="container flex flex-column gap-8 items-center">
        <img src="/assets/images/organizable-logo.png" alt="rankable logo" />
        <h1 class="heading">Create Account</h1>
        <form action="" class="full-width container-sm flex flex-column gap-4 js-signup-form">
          
          ${input({
            label: "Username",
            icon: "/assets/icons/user.svg",
            id: "username",
            required: true,
            error: this.state.errors.username
          })}

          ${input({
            label: "Email",
            icon: "/assets/icons/email.svg",
            id: "email",
            required: true,
            error: this.state.errors.email
          })}

          ${input({
            label: "First name",
            icon: "/assets/icons/user.svg",
            id: "first_name",
            error: this.state.errors.firstName
          })}

          ${input({
            label: "Last name",
            icon: "/assets/icons/user.svg",
            id: "last_name",
            error: this.state.errors.lastName
          })}

          ${input({
            label: "password",
            icon: "/assets/icons/password.svg",
            id: "password",
            required: true,
            error: this.state.errors.password,
            type: "password",
            placeholder: "password"
          })}

          <button 
            type="submit" 
            class="button button--secondary width-full"
          >
            Create Account
          </button>
        </form>

        ${this.state.errors.message ? 
          `<p class="error-300">${this.state.errors.message}</p>`
          :
          ""
        }
        <a href="#" class="js-login-link">Login</a>
      </div>
    </section>
  `
}

function listenSubmit() {
  const form = document.querySelector(".js-signup-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const { username, email, first_name, last_name,  password } = event.target;
    const credentials = {
      username: username.value,
      email: email.value,
      first_name: first_name.value,
      last_name: last_name.value,
      password: password.value
    }
    try {
      emailValidator(email)
      await createUser(credentials);

      STORE.setCurrentPage("boards");

      const boards = await getBoards();
      STORE.setBoards(boards);

      DOMHandler.load(BoardsPage(), document.querySelector("#root"));
    } catch (error) {
      console.log(error)
      let formErrors = JSON.parse(error.message)
      this.state.errors = formErrors
      DOMHandler.reload()
    }
  })
}

function listenLoginLink() {
  const link = document.querySelector(".js-login-link")

  link.addEventListener("click", event => {
    event.preventDefault();

    STORE.setCurrentPage("login");
    DOMHandler.load(LoginPage(), document.querySelector("#root"));
  })
}

function SignupPage() {
  return {
    toString() {
      return render.call(this);
    },
    addListeners() {
      listenSubmit.call(this);
      listenLoginLink();
    },
    state: {
      errors: {}
    }
  }
}

export default SignupPage;