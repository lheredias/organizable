import apiFetch from "./api-fetch.js";

export async function createList(boardId, newList) {
  return apiFetch("boards/"+boardId+"/lists", { body: newList })
}

export function updateList(boardId,id,updatedList) {
  return apiFetch("boards/"+boardId+"/lists/" + id, { method: "PATCH", body: updatedList });
}

export function deleteList(boardId,id) {
  return apiFetch("boards/"+boardId+"/lists/" + id, { method: "DELETE" });
}

export async function updateListsOrder(id, idsInOrder) {
  return apiFetch("boards/"+id+"/lists/sort", { body: idsInOrder })
}