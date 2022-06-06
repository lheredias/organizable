import { updateBoard, deleteBoard, createBoard, getBoard } from "../services/boards-service.js"
import AsideView from "../components/aside.js";
import { renderBoard } from "../components/board.js";
import { renderModal } from "../components/modal.js";
import { dragAndDrogListeners, dragEl } from "../components/drag-and-drop.js";
import DOMHandler from "../dom-handler.js"
import ListsPage from "../pages/lists-page.js"
import STORE from "../store.js";

function renderBoards() {
  let boards = STORE.boards.filter((board) => !board.closed);
  boards.sort((a,b)=>(a.createdAt < b.createdAt) ? -1:1) // Sorted by creation date

  const starredBoards = boards.filter((board) => board.starred)
  const commonBoards = boards.filter((board) => !board.starred)
  const starred = `
  <h2 class="board-section-title">Starred Boards</h2>
  <div class="boards js-starred-boards">
  <ul>${starredBoards
  .map((board) => renderBoard(board))
  .join("")}</ul></div>`

  if (boards.length === 0)
    return `<div class="boards boards--no-content">
    <button class="button-create">Create Board</button>
    </div>`;
  return `
    ${starredBoards.length==0 ? "" : starred}
    <h2 class="board-section-title">Boards</h2>
    <div class="boards js-boards">
    <ul>${commonBoards
    .map((board) => renderBoard(board))
    .join("")}
    <button class="button-create">Create Board</button>
    </ul></div>`;
}

function renderClosedBoards() {
  const boards = STORE.boards.filter((board) => board.closed);
  if (boards.length === 0)
    return `<div class="boards boards--no-content"><h3>No closed boards to show</h3></div>`;
  return `<div class="boards js-boards"><ul>${boards
    .map((board) => renderBoard(board, true))
    .join("")}</ul></div>`;
}

function render(closed=false) {
  return `
    <main class="main">
      ${AsideView()}
      <div class="js-content section">
      <h1>My Boards</h1>
      ${renderModal()}
      ${closed==false? renderBoards() : renderClosedBoards()}
      </div>
    </main>`
}

function listenTooltip() {
  const tooltips = document.querySelectorAll(".tooltip");
  if (tooltips.length==0) return;
  tooltips.forEach(tooltip => {
    tooltip.addEventListener("click", (event) => {
      event.preventDefault()
      // console.log("clicked")
      // const trigger = tooltip.querySelector(".tooltip-trigger");
      const content = tooltip.querySelector(".tooltip-content");
      // console.log(content.classList.contains("hidden"))

      if (content.classList.contains("hidden")==true) {
        content.classList.remove("hidden")
      } else {
        content.classList.add("hidden")
      }

      const triggers = tooltip.querySelectorAll(".tooltip-option");
      triggers.forEach(async (trigger) => {
        if (trigger === event.target) {
          event.preventDefault();
          let colorValue = trigger
            .closest(".tooltip")
            .querySelector("input[name=color]");
          colorValue = trigger.dataset.color;

          const id = event.target.closest("[data-id]").dataset.id
          const board = STORE.boards.filter((board) => board.id==id)[0];
          let idx = STORE.boards.indexOf(board)
          try {
            let updatedBoard = await updateBoard(id,{ color: colorValue });
            STORE.boards[idx] = updatedBoard
            DOMHandler.reload();
          } catch (error) {
            console.log(error)
          }

          // form.style.backgroundColor = `var(--${trigger.dataset.color})`;
        }
      });
    });

  });
  
}

function listenBoardDetail() {
  const items = document.querySelectorAll(".board");
  if(items.length==0) return;
  items.forEach(item => {
    item.addEventListener("click", async (event) => {
     
      if (!event.target.classList.contains("icon") && !event.target.classList.contains("tooltip-option")) {
        try {
          const detailLink = event.target.closest("[data-id]")
          if(!detailLink) return;
          const id = detailLink.dataset.id
          let board = await getBoard(id)
          STORE.setLists(board.lists)
          STORE.setCurrentBoard(board)
          STORE.setCurrentPage("lists")
          DOMHandler.load(ListsPage(), document.querySelector("#root"));
        } catch (error) {
          console.log(error)
          DOMHandler.reload();
        }
        
      }
    })
  })
}

function listenSubmit() {
  const form = document.querySelector(".create-board-form");
  const createBoardBox = document.querySelector(".board-modal");
  let color = createBoardBox.dataset.color
  form.addEventListener("submit", async(event) => {
    event.preventDefault()
    // const createBoardBox = document.querySelector(".board-modal");
    color = createBoardBox.dataset.color
    const { name } = event.target;
    const body = {
      name: name.value,
      color: color
    }
    try {
      const board = await createBoard(body)
      STORE.boards.push(board)
      DOMHandler.reload();
    } catch (error) {
      console.log(error)
    }
  })

}

function listenColor() {
  const createBoardBox = document.querySelector(".board-modal");
  const triggers = document.querySelectorAll(".modal-option");
  triggers.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const color = event.target.closest("[data-color]").dataset.color
      createBoardBox.style.backgroundColor = `var(--${color})`
      createBoardBox.dataset.color = color
    })
  });
}

function renderCreate() {
  if (STORE.currentPage == "boards") {
    const modal = document.querySelector(".modal");
    const trigger = document.querySelector(".button-create");
    const closeButton = document.querySelector(".close-button");
    
    function toggleModal() {
      let status = modal.classList.toggle("show-modal");
      if (status) {
        const tooltips = document.querySelectorAll(".tooltip");
        tooltips.forEach(tooltip => {
          tooltip.classList.toggle("tooltip")
          tooltip.classList.add("tooltip-false")
        }) 
      } else {
        const tooltips = document.querySelectorAll(".tooltip-false");
        tooltips.forEach(tooltip => {
          tooltip.classList.toggle("tooltip-false")
          tooltip.classList.add("tooltip")
        })
      }
    }
  
    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        }
    }
  
    trigger.addEventListener("click", toggleModal);
    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);
  }
}

function closeBoard() {
  const trashRestoreTriggers = document.querySelectorAll(".trash-trigger, .restore-trigger")
  if (trashRestoreTriggers.length == 0) return;
  trashRestoreTriggers.forEach((trashRestoreTrigger) => {
    trashRestoreTrigger.addEventListener("click", async (event) => {
      event.preventDefault()
      const id = event.target.closest("[data-id]").dataset.id
      const board = STORE.boards.filter((board) => board.id==id)[0];
      let idx = STORE.boards.indexOf(board)
      let close = board.closed
      try {
        let updatedBoard = await updateBoard(id,{ closed: !close });
        STORE.boards[idx] = updatedBoard
        DOMHandler.reload();
      } catch (error) {
        console.log(error)
      }
    })
  })
}

function favBoard() {
  const favTriggers = document.querySelectorAll(".fav-trigger")
  if (favTriggers.length==0) return;
  favTriggers.forEach((favTrigger) => {
    favTrigger.addEventListener("click", async (event) => {
      event.preventDefault()
      const id = event.target.closest("[data-id]").dataset.id
      const board = STORE.boards.filter((board) => board.id==id)[0];
      let idx = STORE.boards.indexOf(board)
      let fav = board.starred
      try {
        let updatedBoard = await updateBoard(id,{ starred: !fav });
        STORE.boards[idx] = updatedBoard
        DOMHandler.reload();
      } catch (error) {
        console.log(error)
      }
    })
  })
}

function destroyBoard() {
  const deleteTriggers = document.querySelectorAll(".delete-trigger")
  if (deleteTriggers.length==0) return;
  deleteTriggers.forEach((deleteTrigger) => {
    deleteTrigger.addEventListener("click", async (event) => {
      event.preventDefault()
      const id = event.target.closest("[data-id]").dataset.id
      try {
        await deleteBoard(id);
        STORE.boards = STORE.boards.filter(board => board.id != id)
        DOMHandler.reload();
      } catch (error) {
        console.log(error)
      }
    })
  })
}

function BoardsPage() {
  return {
    toString() {
      if (STORE.currentPage == "boards") {
        return render.call(this);
      } else {
        return render.call(this, true)
      }
    },
    addListeners() {
      AsideView().addListeners();
      closeBoard();
      favBoard();
      destroyBoard();
      renderCreate();
      listenColor();
      listenSubmit();
      listenBoardDetail();
      listenTooltip();
      dragAndDrogListeners();
    },
    state: {
      errors: {}
    }
  }
}

export default BoardsPage;