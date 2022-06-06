// import { getLists, save, getMaxPos } from "./lists-service.js";
import apiFetch from "./api-fetch.js";

export async function createCard(listId, newCard) {
  return apiFetch("lists/"+listId+"/cards", { body: newCard })
}

export function deleteCard(listId,id) {
  return apiFetch("lists/"+listId+"/cards/" + id, { method: "DELETE" });
}

export async function updateCardsOrder(id, idsInOrder) {
  return apiFetch("lists/"+id+"/cards/sort", { body: idsInOrder })
}
