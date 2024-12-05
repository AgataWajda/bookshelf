import './categories-menu';
import './best-sellers-books';
import './category-books-list';
import './charities';
import './pop-up-modal';
import { fetchByCategory, fetchTopBooks, fetchBooksCategoryList, fetchById } from './bookshelf-api';

fetchByCategory('Business Books').then(data => {
  const books = data.map(item => {
    const book = {
      _id: item._id,
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
  return books;
});

fetchByCategory('Audio Nonfiction').then(data => {
  const books = data.map(item => {
    const book = {
      _id: item._id,
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

  return books;
});

fetchBooksCategoryList().then(data => {
  const list = data.map(element => element.list_name);
});

fetchById('643282b1e85766588626a0b6').then(data => {
  const book = {
    _id: data._id,
    title: data.title,
    author: data.author,
    book_image: data.book_image,
    description: data.description,
    category: data.list_name,
    publisher: data.publisher,
    price: data.price,
    marketAmazon: data.amazon_product_url,
    rank: data.rank,
  };

  return book;
});

fetchTopBooks().then(data => {});
