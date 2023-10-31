import { Bookshelf } from './bookshelf-api';

const bookshelf = new Bookshelf();
const LOCALSTORAGE_KEY = 'storage-book-data';
let bookData = {};
const popUpModal = document.querySelector('.pop-up-modal');
const backdropModal = document.querySelector('.backdrop-modal');
const allBooks = document.querySelector('#allBooks');
const categorieList = document.querySelector('.category-books-list');
const bestSellers = document.querySelector('.best-sellers');
const closeButton = document.querySelector('.close-pop-up-modal-btn');
const addBookButton = document.querySelector('.add-book-button');
const storageComment = document.querySelector('.storage-comment');
const removeBookButton = document.querySelector('.remove-button');

function openPopUpModal() {
  popUpModal.classList.remove('is-hidden');
  backdropModal.classList.remove('is-hidden');
}

function closePopUpModal() {
  popUpModal.classList.add('is-hidden');
  backdropModal.classList.add('is-hidden');
}

async function fetchBookById(id) {
  try {
    bookData = {};
    const data = await bookshelf.fetchById(id);
    if (!data) {
      throw new Error('Book not found');
    }
    bookData = {
      book_image: data.book_image,
      title: data.title,
      author: data.author,
      description: data.description,
      marketAmazon: data.buy_links[0].url,
      marketAppleBooks: data.buy_links[1].url,
      list_name: data.list_name,
      id: data._id,
    };
    return bookData;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
}

function createMarkup(data) {
  const bookCard = `
    <img src="${data.book_image}" alt="Book Image" class="image">
    <div class="info-modal">
      <h2 class="title">${data.title}</h2>
      <p class="author">${data.author}</p>
      <p class="description">${data.description}</p>
      <ul class="buy-links">
        <li class="buy-links-item"><a href="${data.marketAmazon}" target="_blank">Amazon</a></li>
        <li class="buy-links-item"><a href="${data.marketAppleBooks}" target="_blank">AppleBooks</a></li>
      </ul>
    </div>`;
  allBooks.innerHTML = bookCard;
}

async function createPopUpModal(id) {
  allBooks.innerHTML = '';
  try {
    const data = await fetchBookById(id);
    createMarkup(data);
    let addedBooks = localStorage.getItem(LOCALSTORAGE_KEY);

    let booksArray = JSON.parse(addedBooks) || [];
    const isInShop = booksArray.find(book => book.id === id);

    if (!isInShop) {
      addBookButton.style.display = 'block';
      removeBookButton.style.display = 'none';
    } else {
      addBookButton.style.display = 'none';
      removeBookButton.style.display = 'block';
    }
  } catch (error) {
    console.error('Error', error);
    allBooks.innerHTML = "<p>Sorry, we couldn't find that book. Please try again later.</p>";
  }
}

const onIdClick = e => {
  if (['UL', 'DIV', 'H2'].includes(e.target.nodeName)) return;
  const id = e.target.closest('li').getAttribute('data-id');
  openPopUpModal();
  createPopUpModal(id);
};

const onIdClickAll = e => {
  if (['UL', 'DIV', 'H2'].includes(e.target.nodeName)) return;
  const id = e.target.closest('a').getAttribute('data-id');
  openPopUpModal();
  createPopUpModal(id);
};

function onAddBook() {
  const searchBookArray = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];
  const bookDataToSave = bookData;

  searchBookArray.push(bookDataToSave);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(searchBookArray));
  addBookButton.style.display = 'none';
  removeBookButton.style.display = 'block';
  storageComment.textContent =
    'Congratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.';
}

function onRemoveBook() {
  const bookToDelete = bookData.id;
  const bookArray = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY)) || [];
  const indexToDelete = bookArray.findIndex(book => book.id === bookToDelete);
  if (indexToDelete !== -1) {
    bookArray.splice(indexToDelete, 1);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(bookArray));
  }
  addBookButton.style.display = 'block';
  removeBookButton.style.display = 'none';
  storageComment.textContent = '';

  const removeEvent = new CustomEvent('removeBookFromList', {
    detail: {
      bookId: bookToDelete,
    },
  });
  document.dispatchEvent(removeEvent);
}

if (categorieList) {
  categorieList.addEventListener('click', onIdClick);
} else {
  console.error('Element .category-books-list nie został znaleziony!');
}
if (bestSellers) {
  bestSellers.addEventListener('click', onIdClickAll);
} else {
  console.error('Element .best-sellers nie został znaleziony!');
}

closeButton.addEventListener('click', closePopUpModal);
addBookButton.addEventListener('click', onAddBook);
removeBookButton.addEventListener('click', onRemoveBook);

backdropModal.addEventListener('click', e => {
  if (e.currentTarget === e.target) {
    closePopUpModal();
  }
});

window.addEventListener('keydown', e => {
  if (e.code === 'Escape') {
    closePopUpModal();
  }
});
