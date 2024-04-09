import { fetchTopBooks } from './bookshelf-api';

const bestCategories = document.querySelector('.best-sellers');

// Feature to download the best books
async function getBestBooks() {
  try {
    return await fetchTopBooks();
  } catch (error) {
    console.error('Error downloading top books:', error);
    return '';
  }
}

//  Function to create a markup for all books in a given category
function createAllBookInCategory(books) {
  return books
    .map((book) => `
      <a href="#" class="books-item-link" aria-label="books-item-link" rel="noopener noreferrer" data-id='${book._id}'>
        <div class="books-card">
          <img
            src="${book.book_image}"
            alt="${book.title}"
            class="books-card-title-img"
            width="180"
            height="256"
            loading="lazy"
          />
          <div class="books-overlay">
            <p class="books-overlay-text">quick view</p>
          </div>
        </div> 
        <div class="books-descr">
          <h3 class="books-card-title">${book.title}</h3>
          <p class="books-card-author">${book.author}</p>
        </div>
      </a>`)
    .join('');
}
// Function to create a single gallery item
function createGalleryItem(data) {
  const markup = `
    <h1 class="title-book">
      Best Sellers <span class="title-book-span">Books</span>
    </h1> 
    <ul class="books-container"> 
      ${data
    .map((elements) => `
          <li class="books-list"> 
            <h3 class="books-list-title">${elements.list_name}</h3>
            <div class="books-card-container" data-list-id="${elements.list_name}">
              ${createAllBookInCategory(elements.books)}
            </div>
          </li>`)
    .join('')}
    </ul>`;

  bestCategories.insertAdjacentHTML('beforeend', markup);
}

async function initializePage() {
  const data = await getBestBooks();
  createGalleryItem(data);
}

initializePage();
