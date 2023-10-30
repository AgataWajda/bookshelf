import './categories-menu';
import './best-sellers-books';
import './category-books-list';
import './charities';
import { Bookshelf } from './bookshelf-api';
import './pop-up-modal';

const my_Bookshelf = new Bookshelf();
my_Bookshelf.fetchByCategory('Business Books').then(data => {
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
  console.log('Business Books: ', books);
  return books;
});

const bookslist = my_Bookshelf.fetchByCategory('Audio Nonfiction').then(data => {
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
  console.log('Audio Nonfiction: ', books);
  return books;
});

my_Bookshelf.fetchBooksCategoryList().then(data => {
  const list = data.map(element => element.list_name);
  console.log('Category List: ', list);
});

my_Bookshelf.fetchById('643282b1e85766588626a0b6').then(data => {
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
  console.log('book by id: ', book);
  return book;
});

my_Bookshelf.fetchTopBooks().then(data => {
  // const list = data.map((element) => element.list_name);
  console.log('Top List: ', data);
});
