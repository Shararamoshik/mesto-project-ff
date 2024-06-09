// отрытия попапа
function openModal(modal){
  modal.classList.add("popup_is-animated");
  setTimeout(() => {
    modal.classList.add("popup_is-opened");
  }, 1);
  modal.addEventListener('click', handleCloseClick);
  document.addEventListener('keydown', handleCloseEsc); 
}

// закрытие попапа
function closeModal(modal){
  modal.classList.remove('popup_is-opened');
  modal.removeEventListener('click', handleCloseClick);
  document.removeEventListener('keydown', handleCloseEsc);
}

// заkрытие по клику на крестик и оверлей
function handleCloseClick(evt) {
  if ( evt.currentTarget === evt.target || evt.target.classList.contains('popup__close') ) {
    closeModal(evt.currentTarget);
  }
}

// закрыте по Esc
function handleCloseEsc(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector(".popup_is-opened");
    closeModal(modal);
  }
}
export {openModal, closeModal};
