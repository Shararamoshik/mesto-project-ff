// отрытия попапа
function openModal(modal){
  modal.classList.add('popup_is-opened');
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
  const modal = document.querySelector(".popup_is-opened");
  if ( evt.currentTarget === evt.target || evt.target.classList.contains('popup__close') ) {
    closeModal(modal);
  }
}

// закрыте по Esc
function handleCloseEsc(evt) {
  if (evt.key === 'Escape') {
    const modal = document.querySelector(".popup_is-opened");
    closeModal(modal);
  }
}
export {openModal, closeModal, handleCloseClick, handleCloseEsc};
