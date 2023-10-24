
import './pop-up-modal';
import './start-modal';
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

import { fetchBooksByCategory, fetchBooksCategoryList, Bookshelf } from './js/bookshelf-api';

// async function booksByCategory(selectedCategory) {
//   const data = await fetchBooksByCategory(selectedCategory);
//   const arrBooks = data.map((item) => {
//     const book = {
//       title: item.title,
//       author: item.author,
//       book_image: item.book_image,
//       description: item.description,
//       category: item.list_name,
//       publisher: item.publisher,
//       price: item.price,
//       marketAmazon: item.amazon_product_url,
//       rank: item.rank,
//     };
//     return book;
//   });
//   console.log('data: ', data);
//   console.log('arrBooks: ', arrBooks);
//   return arrBooks;
// }

// booksByCategory('Business Books');



const  my_Bookshelf = new Bookshelf()
// my_Bookshelf.fetchByCategory('Business Books');
console.log('Category - Business book: ', my_Bookshelf.fetchByCategory('Business Books').then(data => {
  return data.map((item) => {
  const book = {
    title: item.title,
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
}));

async function booksCategoryList() {
  const data = await fetchBooksCategoryList();
  const arrListName = await data.map(element => element.list_name);
  console.log('Category List: ', arrListName);
}

booksCategoryList();

