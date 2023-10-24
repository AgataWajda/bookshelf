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
const BASE_API_URL = 'https://books-backend.p.goit.global/books';

const CATEGORY_LIST = 'category-list';

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
    if (!response.ok) {
      throw new Error("Network response was not OK");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
  }
}

/**
 * Category name to get a list of books in this category.
 * Will receive a collection of 20 books of a certain category
 *
 */

export async function fetchBooksByCategory(selectedCategory) {
  try {
    const controller = new AbortController();
    const signal = controller.signal;
    timeoutID = setTimeout(() => controlller.abort(), 2000);

    const response = await fetch(`${BASE_API_URL}/category?category=${selectedCategory}`, {
      signal
    });
    clearTimeout(timeoutID);
    // ok - shorthand for checking that the status is in the range 2xx (boolean)
    if (!response.ok) {
      throw new Error(`Network response was not OK - HTTP error: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error.message);
  }
}

export class Bookshelf {
  
  controller = new AbortController();
  signal = this.controller.signal;

  Data = {
   byCategoryAll:[],
   byCategory:[]
  }
  
  
  // async getByCategory(selectedCategory) {
  //      this.Data.byCategory =  await this.fetchByCategory(selectedCategory);
         
  //     //  console.log('arrBooks: ', this.Data.byCategory);   
  //      return this.Data.byCategory;
  // }


  async fetchByCategory(selectedCategory) {
    try {
      
      // const timeoutID = setTimeout(() => this.controller.abort() , 2000);
  
      const response = await fetch(`${BASE_API_URL}/category?category=${selectedCategory}`, {
        signal: this.signal
      });
      // clearTimeout(timeoutID);
      // ok - shorthand for checking that the status is in the range 2xx (boolean)
      if (!response.ok) {
        throw new Error(`Network response was not OK - HTTP error: ${response.status}`);
      }
      const data = await response.json();
      this.Data.byCategoryAll = data;
      // console.log(data);
      return data;
    } catch (error) {
      console.error("There has been a problem with your fetch operation:", error.message);
    }
  }
}

