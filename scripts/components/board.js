import { renderToolTip } from "../components/tooltip.js";

export function renderBoard(board, isClosed) {
  let fav_class = "star" 
  if (board.starred != true) fav_class = "unstar"
  
  let footer = `<footer>
    ${renderToolTip()}
    <div >
      <a class="trash-trigger" href="#trash">
        <img
          src="/assets/icons/trash.svg"
          class="icon"
        />
      </a>
    </div>
    <a class="fav-trigger" href="#fav">
        <img
          src="/assets/icons/${fav_class}.svg"
          class="icon"
        />
      </a>
  </footer>`;

  if (isClosed) {
    footer = `<footer>
      <div >
        <a class="delete-trigger" href="#delete">
          <img
            src="/assets/icons/trash.svg"
            class="icon"
          />
        </a>
      </div>
      <div >
        <a class="restore-trigger" href="#restore">
          <img
            src="/assets/icons/restore.svg"
            class="icon"
          />
        </a>
      </div>
    </footer>`;
  }

  return `<li class="board" draggable="true" style="background-color: var(--${board.color})" data-id="${board.id}">
    <h3 class="board-title">${board.name}</h3>
    ${footer}
  </li>`;
}