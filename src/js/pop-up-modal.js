import { Bookshelf } from './bookshelf-api';

const bookshelf = new Bookshelf();
const LOCALSTORAGE_KEY = 'storage-book-data';
let bookData = {};

document.addEventListener('DOMContentLoaded', () => {
  const popUpModal = document.querySelector('.pop-up-modal');
  const backdropModal = document.querySelector('.backdrop-modal');
  const allBooks = document.querySelector('#allBooks');
  const categorieList = document.querySelector('.category-books-list');
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
      const data = await bookshelf.fetchById(id);
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
      return data;
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
          <li class="buy-links-item"><a href="${data.marketAmazon}" target="_blank">
            <img
              width="62"
              height="19"
              srcset="./images/pop-up-modal/iconAmazon@x1.png 1x,
                      ./images/pop-up-modal/iconAmazon@x2.png 2x"
              src="./images/pop-up-modal/iconAmazon@x1.png"
              alt="Amazon"/>
          </a></li>
          <li class="buy-links-item"><a href="${data.marketAppleBooks}" target="_blank">
            <img
              width="33"
              height="32"
              srcset="./images/pop-up-modal/iconAppleBooks@x1.png 1x,
                      ./images/pop-up-modal/iconAppleBooks@x2.png 2x"
              src="./images/pop-up-modal/iconAppleBooks@x1.png"
              alt="AppleBooks"/>
          </a></li>
        </ul>
      </div>`;
    allBooks.innerHTML = bookCard;
  }

  async function createPopUpModal(id) {
    allBooks.innerHTML = '';
    try {
      const data = await fetchBookById(id);
      createMarkup(data);
    } catch (error) {
      console.error('Error', error);
    }
  }

  function onIdClick(e) {
    if (['UL', 'DIV', 'H2'].includes(e.target.nodeName)) return;
    const id = e.target.closest('li').id;
    openPopUpModal();
    createPopUpModal(id);
  }

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
  }

  if (categorieList) {
    categorieList.addEventListener('click', onIdClick);
  } else {
    console.error('Element .category-books-list nie został znaleziony!');
  }

  if (backdropModal) {
    backdropModal.addEventListener('click', e => {
      if (e.target === backdropModal) {
        closePopUpModal();
      }
    });
  } else {
    console.error('Element .backdrop-modal nie został znaleziony!');
  }

  if (closeButton) {
    closeButton.addEventListener('click', closePopUpModal);
  } else {
    console.error('Element .close-pop-up-modal-btn nie został znaleziony!');
  }

  if (addBookButton) {
    addBookButton.addEventListener('click', onAddBook);
  } else {
    console.error('Element .add-book-button nie został znaleziony!');
  }

  if (removeBookButton) {
    removeBookButton.addEventListener('click', onRemoveBook);
  } else {
    console.error('Element .remove-button nie został znaleziony!');
  }

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      closePopUpModal();
    }
  });
});
