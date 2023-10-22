const startModal = document.querySelector('.start-modal');
const backdrop = document.querySelector('.backdrop');
const closeModal = document.querySelector('.close-modal-btn');
//dodałam button, żeby sprawdzać jak wygląda modal//
const startBtn = document.querySelector('.start-btn');
startBtn.addEventListener('click', openModalStart);

function openModalStart() {
  startModal.classList.remove('is-hidden');
  backdrop.classList.remove('is-hidden');
}

function closeModalStart() {
  startModal.classList.add('is-hidden');
  backdrop.classList.add('is-hidden');
}
closeModal.addEventListener('click', closeModalStart);