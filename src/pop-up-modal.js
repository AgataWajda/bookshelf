const popUpModal = document.querySelector('.pop-up-modal');
const backdropModal = document.querySelector('.backdrop-modal');

function openModalById() {
  popUpModal.classList.remove('is-hidden');
  backdropModal.classList.remove('is-hidden'); 
}
function closeModalById() {
  popUpModal.classList.add('is-hidden');
  backdropModal.classList.add('is-hidden');

}

(() => {
  const refs = {
    openModalBtn: document.querySelector("[data-modal-open]"),
    closeModalBtn: document.querySelector("[data-modal-close]"),
    modal: document.querySelector("[data-modal]"),
  };

  refs.openModalBtn.addEventListener("click", toggleModal);
  refs.closeModalBtn.addEventListener("click", toggleModal);

  function toggleModal() {
    refs.modal.classList.toggle("is-hidden");
  }
})();
// catInfo.innerHTML = `<div class="box-img"><img src="${url}" alt="${breeds[0].name}" width="400"/></div><div class="box"><h1>${breeds[0].name}</h1><p>${breeds[0].description}</p><p><b>Temperament:</b> ${breeds[0].temperament}</p></div>`;