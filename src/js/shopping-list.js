// Import the icons from local assets
import amazonIcon from '../images/pop-up-modal/iconAmazon@x1.png';
import appleBooksIcon from '../images/pop-up-modal/iconAppleBooks@x1.png';

document.addEventListener('DOMContentLoaded', () => {
  // Query the document for elements needed
  const shoppingListContainer = document.querySelector('.shopping-list-container');
  const emptyClassElement = document.querySelector('.empty');
  const navbar = document.querySelector('.navbar');
  const pageInput = document.querySelector('.page-input');

  // Select the page buttons
  const prevPageButton = document.getElementById('prev-page-button');
  const currentPageButton = document.getElementById('current-page-button');
  const nextPageButton = document.getElementById('next-page-button');

  // Retrieve stored books or initialize an empty array if none exist
  let storedBooks = JSON.parse(localStorage.getItem('storage-book-data')) || [];
  let currentPage = 1;
  const booksPerPage = 3;
  const totalPages = Math.ceil(storedBooks.length / booksPerPage);

  // Update the visibility of the navigation bar based on page count
  function updateNavbarVisibility() {
    navbar.classList.toggle('is-hidden', totalPages <= 1);
  }

  // Update the active state of the page buttons
  function updateActivePageButton() {
    // Remove active class from all buttons
    document.querySelectorAll('.page-button').forEach(button => {
      button.classList.remove('active');
    });

    // Add active class to the current page button
    currentPageButton.classList.add('active');
  }

  // Update the page buttons to reflect the correct page numbers
  function updatePageButtons() {
    const pageNumbers =
      currentPage === 1 ? [1, 2, 3] : [currentPage - 1, currentPage, currentPage + 1];

    prevPageButton.textContent = pageNumbers[0];
    currentPageButton.textContent = pageNumbers[1];
    nextPageButton.textContent = pageNumbers[2];

    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage === totalPages;

    updateActivePageButton();
  }

  // Navigate to a specific page of the shopping list
  function goToPage(page) {
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderShoppingList();
    updatePageButtons();
  }

  // Event listener for the page input to handle the "Enter" keypress
  pageInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
      const page = Number(pageInput.value);
      if (page) {
        goToPage(page);
      }
    }
  });

  // Event listeners for pagination
  document.querySelector('.first-page-button').addEventListener('click', () => goToPage(1));
  document
    .querySelector('.previous-page-button')
    .addEventListener('click', () => goToPage(currentPage - 1));
  document
    .querySelector('.next-page-button')
    .addEventListener('click', () => goToPage(currentPage + 1));
  document.querySelector('.last-page-button').addEventListener('click', () => goToPage(totalPages));

  // Hide the empty list placeholder if there are items
  if (storedBooks.length > 0) {
    emptyClassElement.classList.add('is-hidden');
  }

  // Remove a book from the shopping list
  function removeBookFromShoppingList(bookId) {
    storedBooks = storedBooks.filter(book => book.id !== bookId);
    localStorage.setItem('storage-book-data', JSON.stringify(storedBooks));
    renderShoppingList();
  }

  // Create a shopping list item (unchanged as requested)
  function createShoppingListItem(book) {
    return `
      <li class="shopping-list-item" data-id="${book.id}">
        <img src="${book.book_image}" alt="${book.title}" class="shopping-list-item-image">
        <div class="shopping-list-item-info">
          <h3 class="shopping-list-item-title font-title">${book.title}</h3>
          <p class="shopping-list-item-category font-category">${book.list_name}</p>
          <p class="shopping-list-item-description font-description">${book.description}</p>
          <p class="shopping-list-item-author font-author">${book.author}</p>
          <ul class="buy-links">
            <li class="buy-links-item link-position">
              <a href="${book.marketAmazon}" target="_blank"><img src="${amazonIcon}" alt="Amazon"></a>
            </li>
            <li class="buy-links-item link-position">
              <a href="${book.marketAppleBooks}" target="_blank"><img src="${appleBooksIcon}" alt="AppleBooks"></a>
            </li>
          </ul>
        </div>
        <div class="icon-trash icon-background">
          <svg width="20px" height="20px" fill="none" viewBox="0 0 16 16">
            <path d="M6 2H10M2 4H14M12.6667 4L12.1991 11.0129C12.129 12.065 12.0939 12.5911 11.8667 12.99C11.6666 13.3412 11.3648 13.6235 11.0011 13.7998C10.588 14 10.0607 14 9.00623 14H6.99377C5.93927 14 5.41202 14 4.99889 13.7998C4.63517 13.6235 4.33339 13.3412 4.13332 12.99C3.90607 12.5911 3.871 12.065 3.80086 11.0129L3.33333 4M6.66667 7V10.3333M9.33333 7V10.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </li>
    `;
  }

  // Render the shopping list items on the page
  function renderShoppingList() {
    if (shoppingListContainer) {
      const startIndex = (currentPage - 1) * booksPerPage;
      const endIndex = startIndex + booksPerPage;
      const booksToDisplay = storedBooks.slice(startIndex, endIndex);
      const shoppingListItems = booksToDisplay.map(createShoppingListItem).join('');
      shoppingListContainer.innerHTML = shoppingListItems;

      // Add event listeners for the delete icons
      shoppingListContainer.querySelectorAll('.icon-trash').forEach(icon => {
        icon.addEventListener('click', () => {
          const bookId = icon.closest('.shopping-list-item').getAttribute('data-id');
          removeBookFromShoppingList(bookId);
        });
      });
    } else {
      console.error('Element .shopping-list-container not found!');
    }
  }

  // Initial render of the shopping list and navigation elements
  renderShoppingList();
  updateNavbarVisibility();
  updatePageButtons();
});
