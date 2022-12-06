const refs = {
  openModalBtn: document.querySelector('.footer__link'),
  closeModalBtn: document.querySelector('.students-button__close'),
  modal: document.querySelector('.backdrop-footer'),
  modalStudents: document.querySelector('.modal-students'),
};

refs.openModalBtn.addEventListener('click', openModal);
refs.closeModalBtn.addEventListener('click', closeModal);
refs.modal.addEventListener('click', backdropClick);

function backdropClick(e) {
  const backdrop = document.querySelector('.backdrop-footer');
  if (e.target === backdrop) {
    closeModal();
  }
}

function openModal() {
  document.addEventListener('keydown', onEsc);
  refs.modal.classList.remove('is-hidden');
}
function closeModal() {
  refs.modal.classList.add('is-hidden');
  document.removeEventListener('keydown', onEsc);
}

function onEsc(e) {
  if (e.key === 'Escape') {
    refs.modal.classList.add('is-hidden');
    closeModal();
  }
}
