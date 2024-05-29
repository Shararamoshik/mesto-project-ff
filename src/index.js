
import './pages/index.css';
import {initialCards} from './scripts/cards.js';
import {deleteCard,createCard, likeCard} from './scripts/card.js';
import {openModal, closeModal} from './scripts/modal.js'; 

const cardTemplate = document.querySelector('#card-template');
const cardsContainer = document.querySelector('.places__list');

const popupAdd = document.querySelector('.popup_type_new-card');
const popupEdit = document.querySelector('.popup_type_edit');
const popupImage = document.querySelector(".popup_type_image");

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

const formNewPlace = document.forms["new-place"] ;
const placeInput = formNewPlace.querySelector(".popup__input_type_card-name");
const urlInput = formNewPlace.querySelector(".popup__input_type_url");

const formEditProfile = document.forms["edit-profile"] ;
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const jobInput = formEditProfile.querySelector(".popup__input_type_description");

const popupCaption = popupImage.querySelector(".popup__caption");
const popupShowImage = popupImage.querySelector(".popup__image");

const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function showImage(cardData) {
  popupCaption.textContent = cardData.name;
  popupShowImage.src = cardData.link;
  popupShowImage.alt = cardData.name;
  openModal(popupImage);
}

// открытие модального окна изменения профиля
buttonEdit.addEventListener('click', function () {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openModal(popupEdit);
})
// отправка формы профиля
function submitFormEditProfile(evt) {
  evt.preventDefault();

  const nameValue = nameInput.value;
  const jobValue = jobInput.value;

  profileTitle.textContent = nameValue;
  profileDescription.textContent = jobValue;

  closeModal(popupEdit);
}
formEditProfile.addEventListener('submit', submitFormEditProfile);

// открытие модального окна добавления карточки 
buttonAdd.addEventListener('click', function () {
  openModal(popupAdd);
});
// отправка формы добавление карточки
function submitFormNewPlace(evt) {
  evt.preventDefault();

  const card = {
    name: placeInput.value,
    link: urlInput.value,
  }
  cardsContainer.prepend(createCard(card, deleteCard, cardTemplate, likeCard, showImage));
  
  formNewPlace.reset();

  closeModal(popupAdd);
}
formNewPlace.addEventListener('submit', submitFormNewPlace);

// @todo: Вывести карточки на страницу
initialCards.forEach((element) => {
  cardsContainer.append(createCard(element, deleteCard, cardTemplate, likeCard, showImage));
});



