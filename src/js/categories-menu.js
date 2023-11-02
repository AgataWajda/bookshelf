import { Bookshelf } from './bookshelf-api.js';

const bookshelfApi = new Bookshelf();
const categoriesListEl = document.querySelector('.categories-list');

categoriesListEl.addEventListener('click', onCategoryClick);

async function renderCategoriesMenu() {
  try {
    const resultJson = await bookshelfApi.fetchBooksCategoryList();

    if (resultJson.length < 1) {
      categoriesListEl.innerHTML = "Sorry, we didn't find anything";
      return [];
    }

    const sortedCategories = resultJson.sort((a, b) => a.list_name.localeCompare(b.list_name));

    const categoriesMarkup = sortedCategories
      .map(
        item => `
      <li class="categories-list-item">${item.list_name}</li>
    `,
      )
      .join('');

    categoriesListEl.innerHTML = `<li class="categories-list-item" selected="true">All categories</li>${categoriesMarkup}`;

    console.log('Categories loaded successfully.');
    return resultJson;
  } catch (error) {
    categoriesListEl.innerHTML = `Error: ${error.message}`;
    console.error(error);
    return [];
  }
}

async function onCategoryClick(e) {
  if (e.target.nodeName !== 'LI') {
    return;
  }

  const prevSelected = document.querySelector('.categories-list-item[selected="true"]');
  if (prevSelected) {
    prevSelected.removeAttribute('selected');
  }

  e.target.setAttribute('selected', 'true');

  const selectedCategory = e.target.textContent;
  try {
    const books = await bookshelfApi.fetchByCategory(selectedCategory);
    console.log('Selected category:', selectedCategory);
  } catch (error) {
    console.error(error);
  }
}

export let categoriesMenu = renderCategoriesMenu();
