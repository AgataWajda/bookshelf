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
      switchElement.classList.add('dark'); // Dodaj klasę dark również do switcha
    } else {
      body.classList.remove('dark');
      switchElement.classList.remove('dark'); // Usuń klasę dark ze switcha
    }
  } catch (err) {
    console.error(err);
  }
}

addDarkClassToHTML();
