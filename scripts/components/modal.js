import { input } from "../components/input.js";

function renderBoardCreator() {
  return `
    <div class="modal-body-create">
      <div class="board-modal" data-color="green" style="background-color: var(--light-green)">
        <form class="create-board-form container-sm flex flex-column gap-2">
          ${input({
            id: "name",
            placeholder: "Board Name",
            required: true,
          })}
          <button class="button button--subtle" style="float: right; margin-top: 10px" type="submit">
            CREATE
          </button>
        </form>
      </div>
    </div>`
}

function renderColors() {
  return `
    <div class="modal-body-colors">
      <div
        data-color="light-green"
        class="modal-option modal-option--light-green"
      ></div>
      <div data-color="red" class="modal-option modal-option--red"></div>
      <div
        data-color="blue"
        class="modal-option modal-option--blue"
      ></div>
      <div
        data-color="orange"
        class="modal-option modal-option--orange"
      ></div>
      <div
        data-color="purple"
        class="modal-option modal-option--purple"
      ></div>
      <div
        data-color="pink"
        class="modal-option modal-option--pink"
      ></div>
      <div
        data-color="green"
        class="modal-option modal-option--green"
      ></div>
      <div
        data-color="gray"
        class="modal-option modal-option--gray"
      ></div>
      <div
        data-color="sky-blue"
        class="modal-option modal-option--sky-blue"
      ></div>
    </div>`
}

export function renderModal() {
  return `
    <div class="modal">
      <span class="close-button">&times;</span>
      <div class="modal-content">
        ${renderBoardCreator()}
        ${renderColors()}
      </div>
    </div>`
}