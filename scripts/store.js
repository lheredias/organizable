import { fromLocalStorage, saveToLocalStorage } from "./utils.js"
import { userDetail } from "./config.js"

const STORE = {
  currentPage: fromLocalStorage("current-page") || "login",
  currentBoard: fromLocalStorage("current-board") || null,
  boards: [],
  lists: fromLocalStorage("lists") || [],
  user: null,
  setUser() {
    let userSession = sessionStorage.getItem(userDetail)
    userSession = JSON.parse(userSession)
    this.user = userSession
  },
  setCurrentPage(page) {
    saveToLocalStorage("current-page", page)
    this.currentPage = page;
  },
  setBoards(boards) {
    this.boards = boards;
  },
  setCurrentBoard(board) {
    saveToLocalStorage("current-board", board)
    this.currentBoard = board;
  },
  setLists(lists) {
    saveToLocalStorage("lists", lists)
    this.lists = lists;
  },
  
}

export default STORE;