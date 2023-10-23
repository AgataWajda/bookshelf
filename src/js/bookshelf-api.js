const axios = require('axios').default;

const API_URL = 'https://books-backend.p.goit.global/books/';

export default class BookshelfApi {
  async fetchCategoriesList() {
    try {
      const url = API_URL + 'category-list';
      const response = await axios.get(url);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

// Constant URL value for API
const BASE_API_URL = 'https://books-backend.p.goit.global';

const CATEGORY_LIST = 'books/category-list';

// Object with  authorization headers and Content-Type header
// const API_REQUEST_HEADERS = {
//   'Content-Type': 'application/json',
// };
//
// // const config = {
//    maxBodyLength: Infinity,
//    headers: API_REQUEST_HEADERS
// };

export async function fetchBooksCategoryList() {
  try {
    const response = await fetch(`${BASE_API_URL}/${CATEGORY_LIST}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
}

/**
 * Category name to get a list of books in this category.
 * Will receive a collection of 20 books of a certain category
 *
 */

export async function fetchBooksByCategory(selectedCategory) {
  try {
    const response = await fetch(`${BASE_API_URL}/books/category?category=${selectedCategory}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
}
