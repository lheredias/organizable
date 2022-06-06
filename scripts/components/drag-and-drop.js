import STORE from "../store.js"
import { updateBoard } from "../services/boards-service.js"
import DOMHandler from "../dom-handler.js"

let dragEl = null;

function dragAndDrogListeners() {
  const items = document.querySelectorAll(".board")

  items.forEach( (item) => {
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragenter", handleDragEnter);
    // item.addEventListener("dragleave", handleDragLeave);
    // item.addEventListener("dragover", handleDragOver);
    // item.addEventListener("drop", handleDrop);
    item.addEventListener("dragend", handleDragEnd);
  })

  let trash = document.querySelector('[data-value="closed"]')
  trash.addEventListener("dragleave", handleDragLeave);
  trash.addEventListener("dragover", handleDragOver);
  trash.addEventListener("drop", handleDropTrash)
  let boards = document.querySelector('[data-value="boards"]')
  boards.addEventListener("dragleave", handleDragLeave);
  boards.addEventListener("dragover", handleDragOver);
  boards.addEventListener("drop", handleRestoreTrash)

}

function handleDragStart(event) {
  this.style.opacity = "0.4"

  dragEl = this
  const id = this.closest("[data-id]").dataset.id
  event.dataTransfer.effectAllowed = "move";

  event.dataTransfer.setData("text", id);
}

function handleDragEnter(event) {
  this.classList.add(".board.over")
}

function handleDragLeave(event) {
  this.classList.remove(".board.over")
  this.style.backgroundColor =""
  this.style.opacity ="1"
}

function handleDragOver(event) {
  event.preventDefault()
  this.style.backgroundColor ="var(--primary-200)"
  this.style.opacity ="0.5"

  return false;
}

async function handleDropTrash(event) {
  event.stopPropagation()
  let id = event.dataTransfer.getData("text")
  const board = STORE.boards.filter((board) => board.id==id)[0];
  let idx = STORE.boards.indexOf(board)
  // let close = board.closed
  try {
    let updatedBoard = await updateBoard(id,{ closed: true });
    STORE.boards[idx] = updatedBoard
    DOMHandler.reload();
  } catch (error) {
    console.log(error)
  }
  return false
}

async function handleRestoreTrash(event) {
  event.stopPropagation()
  let id = event.dataTransfer.getData("text")
  const board = STORE.boards.filter((board) => board.id==id)[0];
  let idx = STORE.boards.indexOf(board)
  // let close = board.closed
  try {
    let updatedBoard = await updateBoard(id,{ closed: false });
    STORE.boards[idx] = updatedBoard
    DOMHandler.reload();
  } catch (error) {
    console.log(error)
  }
  return false
}

function handleDragEnd(event) {
  this.style.opacity = "1"
}

export { dragAndDrogListeners, dragEl }