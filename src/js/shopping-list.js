document.addEventListener('DOMContentLoaded', () => {
  const shoppingListContainer = document.querySelector('.shopping-list-container');
  const emptyClassElement = document.querySelector('.empty');
  let storedBooks = JSON.parse(localStorage.getItem('storage-book-data')) || [];

  if (storedBooks.length > 0 && emptyClassElement) {
    emptyClassElement.classList.add('is-hidden');
  }

  function removeBookFromShoppingList(bookId) {
    storedBooks = storedBooks.filter(book => book.id !== bookId);
    localStorage.setItem('storage-book-data', JSON.stringify(storedBooks));
    renderShoppingList();
  }

  function createShoppingListItem(book) {
    return `
      <li class="shopping-list-item" data-id="${book.id}">
        <img src="${book.book_image}" alt="${book.title}" class="shopping-list-item-image">
        <div class="shopping-list-item-info">
          <h3 class="shopping-list-item-title">${book.title}</h3>
          <p class="shopping-list-item-author">${book.author}</p>
        </div>
        <div class="icon-trash">
          <svg width="20px" height="20px" fill="black" viewBox="0 0 16 16">
            <path d="M6 2H10M2 4H14M12.6667 4L12.1991 11.0129C12.129 12.065 12.0939 12.5911 11.8667 12.99C11.6666 13.3412 11.3648 13.6235 11.0011 13.7998C10.588 14 10.0607 14 9.00623 14H6.99377C5.93927 14 5.41202 14 4.99889 13.7998C4.63517 13.6235 4.33339 13.3412 4.13332 12.99C3.90607 12.5911 3.871 12.065 3.80086 11.0129L3.33333 4M6.66667 7V10.3333M9.33333 7V10.3333" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
      </li>
    `;
  }

  function renderShoppingList() {
    if (shoppingListContainer) {
      const shoppingListItems = storedBooks.map(createShoppingListItem).join('');
      shoppingListContainer.innerHTML = shoppingListItems;

      // Dodajemy nasłuchiwanie zdarzeń dla nowo utworzonych elementów
      const trashIcons = shoppingListContainer.querySelectorAll('.icon-trash');
      trashIcons.forEach(icon => {
        icon.addEventListener('click', () => {
          const bookId = icon.closest('.shopping-list-item').getAttribute('data-id');
          removeBookFromShoppingList(bookId);
        });
      });
    } else {
      console.error('Element .shopping-list-container nie został znaleziony!');
    }
  }

  renderShoppingList();
});
