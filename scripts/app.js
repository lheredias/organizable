import { tokenKey } from "./config.js";
import { router } from "./utils.js";
import DOMHandler from "./dom-handler.js";
import LoginPage from "./pages/login-page.js";
import { getBoards } from "./services/boards-service.js";
import { getUser } from "./services/users-service.js";
import STORE from "./store.js";
const root = document.querySelector("#root");

async function App() {
  const token = sessionStorage.getItem(tokenKey);
  STORE.setUser()
  // let userSession = sessionStorage.getItem(userDetail)
  let module;
  if(!token || !STORE.user) {

    if (["login", "signup"].includes(STORE.currentPage)) {
      module = router[STORE.currentPage]
    } else {
      module = LoginPage;
    }
    return DOMHandler.load(module(), root);
  }

  try {
    // userSession = JSON.parse(userSession)
    await getUser(STORE.user.id)

    const boards = await getBoards();
    STORE.setBoards(boards);

    module = router[STORE.currentPage]
  } catch (error) {
    console.log(error)
    module = LoginPage;
  }

  return DOMHandler.load(module(), root);
}

export default App;