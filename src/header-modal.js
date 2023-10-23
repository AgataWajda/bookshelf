const menuOpen = document.querySelector('.header__button-open');
const menuClose = document.querySelector('.header__button-close');
const menu = document.querySelector('.header-modal');

menuOpen.addEventListener('click', () => {
  menu.classList.remove('header__is-hidden');
  menuOpen.classList.add('header__is-hidden');
  menuClose.classList.remove('header__is-hidden');
});

menuClose.addEventListener('click', () => {
  menu.classList.add('header__is-hidden');
  menuClose.classList.add('header__is-hidden');
  menuOpen.classList.remove('header__is-hidden');
});
