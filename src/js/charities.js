const scrollDownBtn = document.querySelector('.down-btn');
const scrollUpBtn = document.querySelector('.up-btn');
const list = document.querySelector('.charities__list');

scrollDownBtn.addEventListener('click', () => {
  setTimeout(function () {
    list.scrollTo(0, 1000);
  }, 10);
  scrollDownBtn.classList.add('is-hidden');
  scrollUpBtn.classList.remove('is-hidden');
});

scrollUpBtn.addEventListener('click', () => {
  setTimeout(function () {
    list.scrollTo(top);
  }, 10);
  scrollUpBtn.classList.add('is-hidden');
  scrollDownBtn.classList.remove('is-hidden');
});
