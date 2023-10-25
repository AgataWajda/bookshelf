const popUpModal = document.querySelector('.pop-up-modal');
const backdropModal = document.querySelector('.backdrop-modal');
const allBooks = document.querySelector('#allBooks');
const closeButton = document.querySelector('.close-pop-up-modal-btn');
const addBookButton = document.querySelector('.add-book-button');
const storageComment = document.querySelector('.storage-comment');
const removeBookButton = document.querySelector('.remove-button');
const LOCALSTORAGE_KEY = 'storage-book-data';

let bookData = {};
let bookArray = [];

function openPopUpModal() {
  popUpModal.classList.remove('is-hidden');
  backdropModal.classList.remove('is-hidden');
}
//dodałam button, żeby sprawdzać jak wygląda modal//
const btn = document.querySelector('.pop-up-btn');
btn.addEventListener('click', openPopUpModal);

function closePopUpModal() {
  popUpModal.classList.add('is-hidden');
  backdropModal.classList.add('is-hidden');
}

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape') {
    closePopUpModal();
  }
});

backdropModal.addEventListener('click', function (event) {
  if (event.target === backdropModal) {
    closePopUpModal();
  }
});

closeButton.addEventListener('click', closePopUpModal);

async function createPopUpModal(bookId) {
  allBooks.innerHTML = '';
  try {
    const data = await fetchBookById(bookId);
    createMarkup(data);
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
}
async function fetchBookById(bookId) {
  try {
    bookData = {};
    const response = await fetch(`https://books-backend.p.goit.global/books/${bookId}`);
    const data = await response.json();
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
  const bookImage = data.book_image;
  const bookTitle = data.title;
  const bookAuthor = data.author;
  const bookDescription = data.description;
  const marketAmazon = data.buy_links[0].url;
  const marketAppleBooks = data.buy_links[1].url;
  const bookCard = `<img src="${bookImage}" alt="Book Image" class="image">
  <div class="info-modal">
  <h2 class="title">${bookTitle}</h2>
  <p class="author"> ${bookAuthor}</p>
  <p class="description">${bookDescription}</p>
  <ul class="buy-links"> <li class="buy-links-item"><a href="${marketAmazon}" target="_blank"
    > <img
     width="62"
    height="19"
    srcset="
    ./images/pop-up-modal/iconAmazon@x1.png 1x,
    ./images/pop-up-modal/iconAmazon@x2.png 2x
  "
   src="./images/pop-up-modal/iconAmazon@x1.png"
    alt="Amazon"
  /></a></li>
  <li class="buy-links-item"><a href="${marketAppleBooks}" target="_blank"
    > <img
    width="33"
    height="32"
    srcset="
    ./images/pop-up-modal/iconAppleBooks@x1.png 1x,
    ./images/pop-up-modal/iconAppleBooks@x2.png 2x
  "
   src="./images/pop-up-modal/iconAppleBooks@x1.png"
    alt="AppleBooks"
  /></a></li>
</ul>
</div>`;
  allBooks.innerHTML = bookCard;
}

function onAddBook() {
  const searchBookArray = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  const bookDataToSave = bookData;
  if (searchBookArray || searchBookArray.length !== 0) {
    addBookButton.style.display = 'block';
    removeBookButton.style.display = 'none';
    searchBookArray.push(bookDataToSave);
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(searchBookArray));
    addBookButton.style.display = 'none';
    removeBookButton.style.display = 'block';
    storageComment.textContent = 'Сongratulations! You have added the book to the shopping list. To delete, press the button “Remove from the shopping list”.';
  }
}

function onRemoveBook() {
  storageComment.textContent = '';

  const bookToDelete = bookData.id;
  const bookArray = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY));
  const indexToDelete = bookArray.findIndex(book => book.id === bookToDelete);
  bookArray.splice(indexToDelete, 1);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(bookArray));

  addBookButton.style.display = 'block';
  removeBookButton.style.display = 'none';
}

addBookButton.addEventListener('click', onAddBook);
removeBookButton.addEventListener('click', onRemoveBook);