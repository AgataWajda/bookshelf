const switchElement = document.querySelector('.switch');
const body = document.querySelector('body');

function updateTheme() {
  const isDarkMode = localStorage.getItem('theme') === 'dark';
  body.classList.toggle('dark', isDarkMode);
  switchElement.classList.toggle('checked', isDarkMode);
}

function toggleDarkMode() {
  const isDarkMode = localStorage.getItem('theme') === 'dark';
  if (isDarkMode) {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  updateTheme();
}

switchElement.addEventListener('click', event => {
  event.preventDefault();
  toggleDarkMode();
});

updateTheme();
