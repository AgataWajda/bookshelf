import axios from 'axios';

// Constant URL value for API
axios.defaults.baseURL = 'https://books-backend.p.goit.global/books';
const loaderWindow = document.querySelector('.loader-background');
/**
 * Category name to get a list of books in this category.
 * Will receive a collection of 20 books of a certain category
 *
 */
const fetchByCategory = async selectedCategory => {
  try {
    loaderWindow.classList.add('show-loader');
    const response = await axios.get(`/category?category=${selectedCategory}`);
    // ok - shorthand for checking that the status is in the range 2xx (boolean)
    loaderWindow.classList.remove('show-loader');
    return response.data;
  } catch (error) {
    loaderWindow.classList.remove('show-loader');
    console.error('There has been a problem with your fetch operation:', error.message);
    return '';
  }
};

// returns a list of categories
const fetchBooksCategoryList = async () => {
  try {
    loaderWindow.classList.add('show-loader');
    const response = await axios.get('/category-list');
    // ok - shorthand for checking that the status is in the range 2xx (boolean)
    loaderWindow.classList.remove('show-loader');
    return response.data;
  } catch (error) {
    loaderWindow.classList.remove('show-loader');
    console.error('There has been a problem with your fetch operation:', error);
    return '';
  }
};

// will receive the first 5 books from the collection in each category
const fetchTopBooks = async () => {
  try {
    loaderWindow.classList.add('show-loader');
    const response = await axios.get('/top-books');
    // ok - shorthand for checking that the status is in the range 2xx (boolean)
    const data = await response.data;
    loaderWindow.classList.remove('show-loader');
    return data;
  } catch (error) {
    loaderWindow.classList.remove('show-loader');
    console.error('There has been a problem with your fetch operation:', error);
    return '';
  }
};

// will receive complete information about the book
const fetchById = async id => {
  try {
    loaderWindow.classList.add('show-loader');
    const response = await axios.get(`${id}`);
    // ok - shorthand for checking that the status is in the range 2xx (boolean)
    loaderWindow.classList.remove('show-loader');
    return response.data;
  } catch (error) {
    loaderWindow.classList.remove('show-loader');
    console.error('There has been a problem with your fetch operation:', error.message);
    return '';
  }
};

export { fetchBooksCategoryList, fetchByCategory, fetchById, fetchTopBooks };
