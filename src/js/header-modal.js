const menuOpen = document.querySelector('.header__button-open');
const menuClose = document.querySelector('.header__button-close');
const menu = document.querySelector('.header-modal');

menuOpen.addEventListener('click', () => {
  menu.classList.remove('header__is-hidden');
  menu.classList.add('header__is-visible');
  menuOpen.classList.add('header__hide');
  menuClose.classList.remove('header__hide');
});

menuClose.addEventListener('click', () => {
  menu.classList.add('header__is-hidden');
  menu.classList.remove('header__is-visible');
  menuClose.classList.add('header__hide');
  menuOpen.classList.remove('header__hide');
});
