import apiFetch from "./api-fetch.js";
import STORE from "../store.js"

export function getBoards() {
  return apiFetch("boards")
}

export function updateBoard(id,updatedBoard) {
  return apiFetch("boards/" + id, { method: "PATCH", body: updatedBoard });
}

export function createBoard(newBoard = { name, color }){
  return apiFetch("boards", { body: newBoard })
}

export async function getBoard(id) {
  let board = await apiFetch("boards/" + id);
  STORE.setLists(board.lists)        
  return board
}

export function deleteBoard(id) {
  return apiFetch("boards/" + id, { method: "DELETE" });
}