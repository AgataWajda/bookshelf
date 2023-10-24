import { getBestBooks, getCategoryBooks } from './books-data';
import BookMarkupGenerator from './books-markup-generator';

const categoryListContainer = document.querySelector('.category-list-container');

createMarkup();

async function createMarkup() {
  const bestBooksData = await getBestBooks();
  BookMarkupGenerator.createGalleryItem(bestBooksData);
}

export async function createCategoryMarkup(category) {
  const categoryListById = document.querySelector(`[data-list-id="${category}"]`);

  const categoryBooksData = await getCategoryBooks(category);
  const categoryBooksMarkup = BookMarkupGenerator.createAllBookInCategory(categoryBooksData);

  categoryListById.innerHTML = categoryBooksMarkup;
  categoryListById.classList.add('active');
  categoryListById.nextElementSibling.style.display = 'none';

  categoryListById.childNodes.forEach(book =>
    book.addEventListener('click', BookMarkupGenerator.onBookClick),
  );

  categoryListContainer.classList.add('active');
}
