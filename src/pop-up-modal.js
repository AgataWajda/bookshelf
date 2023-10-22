const popUpModal = document.querySelector('.pop-up-modal');
const backdropModal = document.querySelector('.backdrop-modal');
const allBooks = document.querySelector('#allBooks');
const closeButton = document.querySelector('#modal-close');
//dodałam button, żeby sprawdzać jak wygląda modal//
const btn = document.querySelector('button');
btn.addEventListener('click', openPopUpModal);


closeButton.addEventListener('click', closePopUpModal);

let bookData = {};

function openPopUpModal() {
  popUpModal.classList.remove('is-hidden');
  backdropModal.classList.remove('is-hidden'); 
}
function closePopUpModal() {
  popUpModal.classList.add('is-hidden');
  backdropModal.classList.add('is-hidden');
}

async function createPopUpModal(bookId) {
  allBooks.innerHTML = '';
  try {
    const data = await fetchBookById(bookId);
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
}
async function fetchBookById(bookId) {
  try {
    bookData = {};
    const response = await fetch(
      `https://books-backend.p.goit.global/books/${bookId}`
    );
    const data = await response.json();
    bookData = {
      book_image: data.book_image,
      title: data.title,
      author: data.author,
      description: data.description,
      marketAmazon: data.buy_links[0].url,
      marketAppleBooks: data.buy_links[1].url,
    };
    return data;
  } catch (error) {
    console.error('Error', error);
    throw error;
  }
}

function createMarkup(data) {
  const bookImage = data.book_image;
  const bookTitle = data.title;
  const bookAuthor = data.author;
  const bookDescription = data.description;
  const marketAmazon = data.buy_links[0].url;
  const marketAppleBooks = data.buy_links[1].url;
  allBooks.innerHTML = `  
  <img src="${bookImage}" alt="Book Image" class="image">
  <div class="info-modal">
  <h2 class="title">${bookTitle}</h2>
  <p class="author"> ${bookAuthor}</p>
  <p class="description">${bookDescription}</p>
  <ul class="buy-links"> <li class="buy-links-item"><a href="${marketAmazon}" target="_blank"
    > <img
     width="62"
    height="19"
  //   srcset="
  //   ** 1x,
  //   ** 2x
  // "
  //  src="**"
    alt="Amazon"
  /></a></li>
  <li class="buy-links-item"><a href="${marketAppleBooks}" target="_blank"
    > <img
    width="33"
    height="32"
  //   srcset="
  //   ** 1x,
  //   ** 2x
  // "
  //  src="**"
    alt="AppleBooks"
  /></a></li>
</ul>
</div>
  `;
}


// (() => {
//   const refs = {
//     openModalBtn: document.querySelector("[data-modal-open]"),
//     closeModalBtn: document.querySelector("[data-modal-close]"),
//     modal: document.querySelector("[data-modal]"),
//   };

//   refs.openModalBtn.addEventListener("click", toggleModal);
//   refs.closeModalBtn.addEventListener("click", toggleModal);

//   function toggleModal() {
//     refs.modal.classList.toggle("is-hidden");
//   }
// })();
// catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;