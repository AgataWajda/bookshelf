const mainTitleCategory = document.querySelector('.category-books-list__title');
const categoryList = document.querySelector('.category-books-list__list');
const categoriesQuery = document.querySelector('.categories-list');
const topBooks = document.querySelector('.best-sellers');
const URL = 'https://books-backend.p.goit.global/books/category';

categoriesQuery.addEventListener('click', onCategoryClick);

function fetchCategory(query) {
  return fetch(`${URL}?category=${query}`).then(res => res.json());
}

function renderTargetCategory(categories) {
  const markup = categories
    .map(
      category => `
    <li data-id="${category._id}" class="category-books-list__item">
      <div class="card__container card">
        <div class="card__img-container">
          <img src="${category['book_image']}" alt="${category.title}" class="card__img">
          <p class="img-hover">QUICK VIEW</p>
        </div>
        <div class="card__desc">
          <h3 class="card__heading">${category.title}</h3>
          <p class="card__author">${category.author}</p>
        </div>
      </div>
    </li>
  `,
    )
    .join('');

  categoryList.innerHTML = markup;
}

function getCategory(query) {
  fetchCategory(query)
    .then(res => {
      renderTargetCategory(res);
    })
    .catch(error => console.error('Error fetching data:', error));
}

function onCategoryClick(e) {
  const value = e.target.textContent;
  if (value === 'All categories') {
    topBooks.style.display = 'block';
    mainTitleCategory.innerHTML = '';
    return;
  }

  const words = value.split(' ');
  const lastWord = words.pop();
  const categoryTitle = `${words.join(' ')} <span class="paintedWord">${lastWord}</span>`;

  mainTitleCategory.innerHTML = categoryTitle;
  getCategory(value);
  topBooks.style.display = 'none';
}
