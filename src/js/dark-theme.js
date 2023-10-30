document.querySelector('.switch').addEventListener('click', event => {
  event.preventDefault();
  if (localStorage.getItem('theme') === 'dark') {
    localStorage.removeItem('theme');
  } else {
    localStorage.setItem('theme', 'dark');
  }
  addDarkClassToHTML();
});

function addDarkClassToHTML() {
  try {
    const body = document.querySelector('body');
    const switchElement = document.querySelector('.switch');

    if (localStorage.getItem('theme') === 'dark') {
      body.classList.add('dark');
      switchElement.classList.add('dark');
    } else {
      body.classList.remove('dark');
      switchElement.classList.remove('dark');
    }
  } catch (err) {
    console.error(err);
  }
}

addDarkClassToHTML();
