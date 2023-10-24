import './sass/main.scss';
import './pop-up-modal';
import './js/categories-menu';
import './js/top-books';
import { fetchBooksByCategory, fetchBooksCategoryList } from './js/bookshelf-api';

async function booksByCategory(selectedCategory) {
  const data = await fetchBooksByCategory(selectedCategory);
  const arrBooks = data.map(item => {
    const book = {
      author: item.author,
      book_image: item.book_image,
      description: item.description,
      category: item.list_name,
      publisher: item.publisher,
      price: item.price,
      marketAmazon: item.amazon_product_url,
      rank: item.rank,
    };
    return book;
  });
  return arrBooks;
}

booksByCategory('Business Books');

async function booksCategoryList() {
  const data = await fetchBooksCategoryList();
  const arrListName = await data.map(element => element.list_name);
  console.log('Category List: ', arrListName);
}

booksCategoryList();
