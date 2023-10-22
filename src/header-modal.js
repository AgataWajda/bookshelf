const menuOpen = document.querySelector('.header__button-open');
const menuClose = document.querySelector('.header__button-close');
const menu = document.querySelector('.header-modal');

menuOpen.addEventListener('click', () => {
  menu.classList.remove('is-hidden');
  menuOpen.classList.add('is-hidden');
  menuClose.classList.remove('is-hidden');
});

menuClose.addEventListener('click', () => {
  menu.classList.add('is-hidden');
  menuClose.classList.add('is-hidden');
  menuOpen.classList.remove('is-hidden');
});
