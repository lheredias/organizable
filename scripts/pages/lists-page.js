import DOMHandler from "../dom-handler.js"
import STORE from "../store.js";
import { createCard, deleteCard, updateCardsOrder } from "../services/cards-service.js";
import { createList, deleteList, updateList, updateListsOrder } from "../services/lists-service.js";
import BoardsPage from "./boards-page.js";
import { getBoard } from "../services/boards-service.js"

const sortByPos = (a,b) => a.pos - b.pos

function renderEdit(list) {
  return `
  <div class="card-form js-edit-form-container" style="display:none">
    <form action="" class="card-form js-edit-form" data-id="${list.listId}">
      <input 
        type="text" 
        class="card-form__input"
        value="${list.name}"
        required
        id="name"
        name="name"
      />
      <button 
        type="submit"
        class="button button--secondary button--sm button--only-icon"
      >
        <img
          src="/assets/icons/check.svg"
          class="button__icon"
        />
      </button>
    </form>
    <button 
      data-value="edit-list-cancel"
      class="button button--create button--sm button--only-icon"
    >
      <img
        src="/assets/icons/cancel.svg"
        class="button__icon"
      />
    </button>
  </div>`
}

function renderHeader() {
  return `
    <header class="bg-gray-200 p-y-3 flex justify-center">
      <a class="home-trigger" href="#home">
        <img src="/assets/images/organizable-logo.png" alt="rankable logo" />
      </a>
    </header>`
}

function renderCard(card) {
  return `
    <div class="card js-card" data-id="${card.cardId}">
      <p>${card.name}</p>
      <img 
        src="/assets/icons/trash.svg" 
        alt="trash" 
        class="js-card-trash"
      />
    </div>`
}

function renderList(list){
  const cards = list.cards;

  let sortedCards = []
  if (cards.length!=0) sortedCards = cards.sort(sortByPos)


  return `
    <div class="list js-list" data-id="${list.listId}">
    ${renderEdit(list)}
      <div class="list__header">
        <h2 class="heading heading--xs">${list.name}</h2>
        <div>
          <img 
            src="/assets/icons/edit.svg" 
            alt="edit"
            class="js-list-edit icon"
            style="float: left;"
          />
          <img 
            src="/assets/icons/trash.svg" 
            alt="trash"
            class="js-list-trash icon"
            style="float: right;"
          />
        </div>
      </div>
      <hr class="full-width m-0" />
      <div class="card-list js-list-container" data-listName="cards-madrid">
        
        ${sortedCards.map(renderCard).join("")}
        
      </div>
      <form action="" class="card-form js-card-form" data-list-id="${list.listId}">
        <input 
          type="text" 
          class="card-form__input"
          placeholder="new card"
          required
          id="name"
          name="name"
        />
        <button 
          type="submit"
          class="button button--secondary button--sm button--only-icon"
        >
          <img
            src="/assets/icons/plus.svg"
            alt="mail icon"
            class="button__icon"
          />
        </button>
      </form>
    </div>`
}

function render() {
  const lists = STORE.lists;
  const sortedLists = lists.sort(sortByPos)
  
  return `
    <div style="background-color:var(--${STORE.currentBoard.color}); min-height: 100vh">
      <div>
        ${renderHeader()}
        <section
          class="section-sm flex gap-8 items-start wrap"
          data-listName="lists"
        >

          <div class="flex gap-8 items-start wrap js-lists-container">
            ${sortedLists.map(renderList).join("")}
          </div>

          <div class="list" data-id="form">
            <form action="" class="card-form js-list-form">
              <input 
                type="text" 
                class="card-form__input" 
                placeholder="new list"
                id="name"
                name="name"
                required
              />
              <button
                type="submit"
                class="button button--secondary button--sm button--only-icon"
              >
                <img
                  src="/assets/icons/plus.svg"
                  alt="mail icon"
                  class="button__icon"
                />
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
    `
}

function addSortableLists(){
  const listContainer = document.querySelector(".js-lists-container")
  const boardId = STORE.currentBoard.id
  new Sortable(listContainer, {
    animation: 150,
    store: {
      set: async function (sortable) {
        const order = sortable.toArray().map((id) => +id);
        await updateListsOrder(boardId,{ ids: order })
        await getBoard(boardId)
                
        DOMHandler.reload()
      }
    }
  });
}

function addSortableCards(){
  const cardContainers = document.querySelectorAll(".js-list-container")

  cardContainers.forEach((cardContainer) => {
    const list = cardContainer.closest(".js-list");
    const id = +list.dataset.id;
    const boardId = STORE.currentBoard.id

    new Sortable(cardContainer, {
      animation: 150,
      // group: 'shared',
      store: {
        set: async function (sortable) {
          const order = sortable.toArray().map((id) => +id);
          await updateCardsOrder(id, { ids: order })
          await getBoard(boardId)
                  
          DOMHandler.reload()
        }
      }
    });
  })
}

function listenCardTrash() {
  const listDivs = document.querySelectorAll(".js-list");

  listDivs.forEach((list) => {
    list.addEventListener("click", async (event) => {
      const cardTrash = event.target.closest(".js-card-trash")
      if(!cardTrash) return;
      const card = cardTrash.closest(".js-card")
      console.log(card)
      const id = +card.dataset.id;
      const listId = +card.closest(".js-list").dataset.id
      const boardId = STORE.currentBoard.id
      try {
        await deleteCard(listId, id);
        await getBoard(boardId)
                
        DOMHandler.reload()
      } catch (error) {
        console.log(error)
      }
    })
  })
}

function listenListTrash() {
  const listTrashes = document.querySelectorAll(".js-list-trash")

  listTrashes.forEach((listTrash) => {
    listTrash.addEventListener("click", async (event) => {
      const list = event.target.closest(".js-list");
      const id = +list.dataset.id;
      const boardId = STORE.currentBoard.id
      
      try {
        await deleteList(boardId,id);
        await getBoard(boardId)
        
        DOMHandler.reload()
      } catch (error) {
        console.log(error)
      }
    })
  })
}

function listenEditList() {
  const editButtons  = document.querySelectorAll(".js-list-edit");
  if (editButtons.length==0) return;
  editButtons.forEach(editButton => {
    editButton.addEventListener("click", (e) => {
      let editFormContainer  = e.target.parentNode.parentNode.parentNode.querySelector(".js-edit-form-container")
      let editForm = editFormContainer.querySelector(".js-edit-form");
      let listHeader  = editFormContainer.parentNode.querySelector(".list__header");
      editFormContainer.style.display=""
      listHeader.style.display="none"

      const cancelButtons  = document.querySelectorAll('[data-value="edit-list-cancel"]');
      cancelButtons.forEach(cancelButton => {
        cancelButton.addEventListener("click", (event) => {
          editFormContainer.style.display="none"
          listHeader.style.display=""
        })
      })

      editForm.addEventListener("submit", async(event) => {
        event.preventDefault();
        const { name } = event.target;
        try {
          const boardId = STORE.currentBoard.id
          const id = event.target.closest("[data-id]").dataset.id
          await updateList(boardId, id, { name: name.value });
          await getBoard(boardId)
          
          DOMHandler.reload();
        } catch (error) {
          console.log(error)
        }
      })
      
    })
  })
}

function listenSubmitCard() {
  const cardForms = document.querySelectorAll(".js-card-form")
  
  cardForms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const { name } = event.target
      const listId = +event.target.dataset.listId

      try {
        await createCard(listId, { name: name.value })
        const boardId = STORE.currentBoard.id
        await getBoard(boardId)
        
        DOMHandler.reload();
      } catch (error) {
        console.log(error)
      }

    })
  })
}

function listenListForm() {
  const form  = document.querySelector(".js-list-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const { name } = event.target;

    try {
      const boardId = STORE.currentBoard.id
      await createList(boardId, { name: name.value });
      await getBoard(boardId)
      
      DOMHandler.reload();
    } catch (error) {
      console.log(error)
    }
  })
}

function listenHome() {
  const homeButton = document.querySelector(".home-trigger")
  homeButton.addEventListener("click", (event) => {
    event.preventDefault()
    STORE.setCurrentPage("boards")
    DOMHandler.load(BoardsPage(), document.querySelector("#root"))
  })
}

function ListsPage() {
  return {
    toString() {
      return render.call(this);
    },
    addListeners() {
      listenHome();
      listenListForm();
      listenSubmitCard();
      listenEditList();
      listenListTrash();
      listenCardTrash();
      addSortableLists();
      addSortableCards();
      // listenLogout();
      // listenSubmitCard();
      // listenCardTrash();
      // listenListTrash();
      // listenListForm();
      // addSortableCards();
      // addSortableLists();
    },
    state: {
      errors: {}
    }
  }
}

export default ListsPage;