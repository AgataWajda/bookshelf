import Axios from 'axios';

export async function getBestBooks() {
  try {
    const response = await Axios.get('https://books-backend.p.goit.global/books/top-books');
    return response.data;
  } catch (error) {
    console.error('Error fetching best books:', error);
    throw new Error('Failed to fetch best books');
  }
}

export async function getCategoryBooks(category) {
  try {
    const response = await Axios.get(
      `https://books-backend.p.goit.global/books/category?category=${category}`,
    );
    return response.data;
  } catch (error) {
    console.error(`Error fetching books in category ${category}:`, error);
    throw new Error(`Failed to fetch books in category ${category}`);
  }
}
