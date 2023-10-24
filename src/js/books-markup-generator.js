import { createCategoryMarkup } from './top-books';

class BookMarkupGenerator {
  static createBookMarkup(book) {
    return `
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
      </a>`;
  }

  static createCategoryList(elements) {
    return elements
      .map(element => {
        const booksMarkup = element.books.map(this.createBookMarkup).join('');
        return `
          <li class="books-list"> 
            <h3 class="books-list-title">${element.list_name}</h3>
            <div class="books-card-container" data-list-id="${element.list_name}">
              ${booksMarkup}
            </div>
            <button class="books-btn" type="button" data-id="${element.list_name}">see more</button>
          </li>`;
      })
      .join('');
  }

  static createGalleryItem(data) {
    const markup = `
      <h1 class="title-book">
        Best Sellers <span class="title-book-span">Books</span>
      </h1> 
      <ul class="books-container">
        ${this.createCategoryList(data)}
      </ul>`;

    const bestCategories = document.querySelector('.best-sellers');
    bestCategories.insertAdjacentHTML('beforeend', markup);

    const homeBooksBtn = document.querySelectorAll('.books-btn');
    const homeBookLink = document.querySelectorAll('.books-item-link');

    homeBooksBtn.forEach(btn => {
      btn.addEventListener('click', this.onSeeMoreBtn);
    });

    homeBookLink.forEach(book => {
      book.addEventListener('click', this.onBookClick);
    });
  }

  static onSeeMoreBtn(e) {
    const listId = e.target.dataset.id;
    createCategoryMarkup(listId);
  }

  static onBookClick(e) {
    e.preventDefault();
    const bookId = e.currentTarget.dataset.id;
    // console.log(bookId);
  }

  static createAllBookInCategory(data) {
    return data.map(this.createBookMarkup).join('');
  }
}

export default BookMarkupGenerator;
