# Organizable 📇

<p align="center">
  <img src="./screenshots/organizable.gif">
</p>

### **Screenshots:**

<table>
  <tr>
    <td><img src="./screenshots/01.png"></td>
    <td><img src="./screenshots/02.png"></td>
  </tr>
  <tr>
    <td><img src="./screenshots/03.png"></td>
    <td><img src="./screenshots/04.png"></td>
  </tr>
 </table>

`Organizable` is an API client built upon Javascript that helps you organize and keep track of your projects 🔆.

`Organizable` allows you handle sets of boards, each of which includes multiple lists, which in turn contain sets of cards. 

This single-page web app was developed as part of an extended project of [Codeable](https://github.com/codeableorg) web-development bootcamp. It was specifically the final evaluation of the Javascript module 💻.

## Resources

- API endpoint: **[here](https://api-organizable.herokuapp.com)**
- Insomnia collection: **[here](./organizable-insomnia.json)**

## Features and Complexity

`Organizable` was built employing Javascript modules, DOM injection and vanilla CSS.

### **User can login**

As a user, I am able to login into `Organizable` app

- Given that I am on login page
- Then I see a form with two fields: username and password
- When I fill current fields and click in `Login` button
- If credentials are valid
- Then I am redirected to the `Main` page.
- And I can start navigating within the boards

### **User can sign up**

As a user, I want to be able to sign up into `Organizable` app

- Given that I am on the sign up page
- Then I see a form with five fields: username, password, email, first name and
  last name.
- When I fill in these fields and click on the `Sign Up` button
- Then I am redirected to the `Main` page.
- And I can create my first boards.

### **User can log out**

As an Organizable's user, I want to be able to logout from `Organizable` app

- Given that I am at any page except Board's page
- Then I see a sidebar
- Then I see a `Logout` option.
- When I click the `Logout` option, then I am redirected to the `Login` page.
- And my session is terminated.

### **User can edit his profile**

As a user, I am able to see my profile, so that I can edit it.

- Given that I am on the `Main` page
- Then I see a sidebar
- Then I see a `Profile` option.
- When I click the `Profile` option, then I see a form with my current
  information
- Then I can update these information
- When I click the `Update Profile`button, then my info is updated accordingly

### **User can delete his account**

As a user, I am able to delete my account.

- Given that I am on my `Profile` page
- Then I see a form with my current information
- When I click the `Delete my Account`button, then my user is deleted
- And I'm redirected to the `Login` page.

### **User can see Organizable's home**

As a user, I can see the `Main` page.

- Given that I am on the main page
- Then I see a sidebar that contains `My Boards`, `Closed Boards`, `My Profile` and
  `Log Out` sections
- Then I see a main area that contains boards classified by
  `Starred Boards` and `Boards`
- Then I see a `Create Board`  button that allows me to create a brand new board.

### **User can create a new board**

As a user, I can create a new board.

- Given that I am on the main page
- Then I see a `Create board` button
- Then I see a `Board` modal
- Then I fill `Board` details like color and title
- When I click on `Create`
- Then I see a new board created on the main page

### **User can drag-and-drop boards to send them back and forth to the closed section**

As a user, I can close and restore boards via drag-and-drop actions.

- Given that I am on main page
- Then I drag-and-drog a board to `Closed boards`
- Given that I am on closed boards section
- Then I drag-and-drog a closed board to restore it to `My Boards`

### **User can edit a board's color**

As a user, I want to edit a board's color.

- Given that I am on main page
- Then I see a list of boards
- When I click a board's pallete button
- Then a modal with color options appears
- When I click a color
- Then the board is updated with that color

### **User can star a board**

As a user, I want to be able to highlight relevant notes, so that I can
establish relevance between tasks.

- Given that I am on main page
- Then I see a list of boards
- When I click the "Star" button
- Then the board is positioned at the `Starred Board` group.

### **User can close a board**

As a user, I want to be able to close a board.

- Given that I am on main page
- Then I see a list of boards
- Then I hover on a card
- Then I click a `trash` button
- Then the board is removed from `My Boards` and added to `Closed boards`.

### **User can delete permanently boards**

As a user, I want to be able to delete permanently a board, so that I can delete
non-relevant boards.

- Given that I am on `Closed board’s` page
- Then I see a list of deleted boards
- When I click the `Trash`  button
- Then, my current board will be permanently deleted

### **User can recover a closed board**

As a user, I want to be able to recover a deleted board.

- Given that I am on `Closed board's` page
- Then I see a list of deleted boards
- When I click the arrow up button
- Then current board will be restored and added to `My Boards`

### **User can see a board details**

As a user, I want to be able to see a board details, so that I can handle
multiple lists and tasks (cards).

- Given that I am on the main page
- When I click any board
- Then I navigate to that board's Page where I can interact with features like
  lists and cards.

### **User can add a new list**

As a user, I can add a new list, so that I can create and handle more tasks.

- Given that I am on the board page
- Then I see a form to create a new list with a title.
- When I click on `+` button
- The a new list is created.

### **User can edit a list**

As a user, I can edit a list name.

- Given that I am on the current board page
- Then I see the title at the top of the list
- When I click the edit button, then an editable input will be displayed

### **User can add a new card within the list**

As a user, I want to be able to add a new card.

- Given that I am on board page
- Then I see a form to add a new card with a name
- When I click the `+` button, a new `card` will be created.

### **User can delete cards**

As a user, I want to be able to delete cards.

- Given that I am on board page
- Then I see a card
- When I click the `trash` button, the card is deleted.

### **User can go back to `My Board's` page**

As a user, I want to be able to navigate back to `My Boards` page.

- Given that I am on a board page
- Then I see the app's logo, `Organizable`
- When I click the logo
- Then I'm redirected to `My Board's` page.

### **User can reorder lists**

As a user, I want to be able to reorder lists via drag-and-drop actions.

- Given that I am on a board page
- Then I see a list of cards
- Then I can reorder and change position between lists
- And I create a custom order for lists

### **User can reorder cards**

As a user, I want to be able to reorder cards via drag-and-drop actions.

- Given that I am on a board page
- Then I see a list of cards
- Then I can reorder and change position between cards
- And I create a custom order for cards.

**[Sortable](https://github.com/SortableJS/Sortable)** was employed in order to achieve the last two features.
