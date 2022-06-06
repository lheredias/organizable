import { input } from "../components/input.js";
import { updateUser, deleteUser } from "../services/users-service.js"
import DOMHandler from "../dom-handler.js";
import BoardsPage from "./boards-page.js";
import STORE from "../store.js";
import AsideView from "../components/aside.js";
import LoginPage from "./login-page.js";
import { emailValidator } from "../utils.js";

function renderForm() {
  return `
  <section class="section-lg">
    <div class="container flex flex-column gap-8 items-center">
      <img src="/assets/images/organizable-logo.png" alt="rankable logo" />
      <h1 class="heading">Create Account</h1>
      <form action="" class="full-width container-sm flex flex-column gap-4 js-update-form">
        
        ${input({
          label: "Username",
          icon: "/assets/icons/user.svg",
          id: "username",
          value: STORE.user.username,
          error: this.state.errors.username
        })}

        ${input({
          label: "Email",
          icon: "/assets/icons/email.svg",
          id: "email",
          value: STORE.user.email,
          error: this.state.errors.email
        })}

        ${input({
          label: "First name",
          icon: "/assets/icons/user.svg",
          id: "first_name",
          value: STORE.user.firstName,
          error: this.state.errors.firstName
        })}

        ${input({
          label: "Last name",
          icon: "/assets/icons/user.svg",
          id: "last_name",
          value: STORE.user.lastName,
          error: this.state.errors.lastName
        })}

        <button 
          type="submit" 
          class="button button--primary width-full"
        >
          Update Profile
        </button>
      </form>

      ${this.state.errors.message ? 
        `<p class="error-300">${this.state.errors.message}</p>`
        :
        ""
      }
      <div class="full-width container-sm flex flex-column">
        <button 
          class="button button--secondary width-full"
          data-value="delete"
        >
          Delete My Acount
        </button>
      </div>
    </div>
  </section>
`
}

function render() {
  return `
    <main class="main">
      ${AsideView()}
      ${renderForm.call(this)}
    </main>`
}

function listenDelete() {
  const deleteButon = document.querySelector('[data-value="delete"]');
  deleteButon.addEventListener("click", async (event) => {
    event.preventDefault();
    try {
      await deleteUser(STORE.user.id)
      DOMHandler.load(LoginPage(), document.querySelector("#root"));
    } catch (error) {
      console.log(error)
      let formErrors = JSON.parse(error.message)
      this.state.errors.form = formErrors;
      // DOMHandler.load(LoginPage(), document.querySelector("#root"))
      DOMHandler.reload()
    }
  })
}

function listenSubmit() {
  const form = document.querySelector(".js-update-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const { username, email, first_name, last_name } = event.target;
    const credentials = {
      username: username.value,
      email: email.value,
      first_name: first_name.value,
      last_name: last_name.value,
    }
    
    try {
      emailValidator(email)
      await updateUser(STORE.user.id, credentials)
      STORE.setCurrentPage("boards")
      DOMHandler.load(BoardsPage(), document.querySelector("#root"));
    } catch (error) {
      let formErrors = JSON.parse(error.message)
      this.state.errors = formErrors;
      DOMHandler.reload()
    }
  })
}

function ProfilePage() {
  return {
    toString() {
      return render.call(this);
    },
    addListeners() {
      AsideView().addListeners();
      listenSubmit();
      listenDelete();
      // listenSubmit.call(this);
      // listenCreateAccount();
    },
    state: {
      errors: {},
    }
  }
}

export default ProfilePage;