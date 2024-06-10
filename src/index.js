import './pages/index.css';
import * as api from "./scripts/api.js";
import { createCard, removeCard, likeCard } from './scripts/card.js'
import { openModal, closeModal } from './scripts/modal.js'
import { enableValidation, clearValidation } from './scripts/validation.js'

// Объявление глобальных переменных
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

const cardsContainer = document.querySelector(".places__list");

const profileImage = document.querySelector('.profile__image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const cardModal = document.querySelector(".popup_type_image");
const captionCardModal = cardModal.querySelector(".popup__caption");
const imageCardModal = cardModal.querySelector(".popup__image");

const buttonAdd = document.querySelector(".profile__add-button");
const popupAddCard = document.querySelector(".popup_type_new-card");

const buttonEditProfile = document.querySelector(".profile__edit-button");
const popupEdit = document.querySelector(".popup_type_edit");

const buttonEditAvatar = document.querySelector(".profile__avatar-button");
const popupEditAvatar = document.querySelector(".popup_type_avatar");

const popupDeleteCard = document.querySelector(".popup_type_delete-card");

const formNewCard = document.forms["new-place"] ;
const placeInput = formNewCard.querySelector(".popup__input_type_card-name");
const urlInput = formNewCard.querySelector(".popup__input_type_url");

const formEditProfile = document.forms["edit-profile"];
const nameInput = formEditProfile.querySelector(".popup__input_type_name");
const descriptionInput = formEditProfile.querySelector(".popup__input_type_description");

const formEditAvatar = document.forms["edit-avatar"];
const avatarInput = formEditAvatar.querySelector(".popup__input_type_avatar");

const formDeletePlace = document.forms["delete-place"];

let profileId;
let cardToDelete = {};

// открытия большой картинки)
function showImage(card) {
  captionCardModal.textContent = card.name;
  imageCardModal.src = card.link;
  imageCardModal.alt = card.name;
  openModal(cardModal);
}

// открытия попапа редактирования профиля
function openEditPopup() {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;
  clearValidation(formEditProfile, validationConfig);
  openModal(popupEdit);
}

// Функция открытия попапа с подтверждением удаления карточки
function openDeleteConfirmationPopup(cardId, currentCard) {
  cardToDelete = {
    id: cardId,
    element: currentCard
  };
  openModal(popupDeleteCard);
}

// изменение текста кнопки
function renderLoading(submitButton, isLoading, buttonText = "Сохранить", loadingText = "Сохранение...") {
  if (isLoading) {
    submitButton.textContent = loadingText;
  } else {
    submitButton.textContent = buttonText;
  }
}

// отправка данных на сервер
function handleSubmit(request, evt, loadingText = "Сохранение...") {
  evt.preventDefault();
  const submitButton = evt.submitter;
  const initialText = submitButton.textContent;
  renderLoading(submitButton, true, initialText, loadingText);
  request()
    .then(() => {
      evt.target.reset();
    })
    .catch((err) => {
      console.error(`Ошибка: ${err}`);
    })
    .finally(() => {
      renderLoading(submitButton, false, initialText);
    });
}

// отправка формы профиля
function handleProfileFormSubmit(evt) {
  function makeRequest() {
    return api.changeProfileInfo(nameInput.value, descriptionInput.value)
      .then((result) => {
        profileTitle.textContent = result.name;
        profileDescription.textContent = result.about;
        closeModal(popupEdit);
      });
  }
  handleSubmit(makeRequest, evt);
}

// открытие попапа профиля
buttonEditProfile.addEventListener('click', () => openEditPopup());

formEditProfile.addEventListener('submit', handleProfileFormSubmit);

// отправка нового аватара
function handleAvatarFormSubmit(evt) {
  function makeRequest() {
    return api.setAvatar(avatarInput.value)
      .then((result) => {
        profileImage.style.backgroundImage = 'url(' + result.avatar + ')';
        closeModal(popupEditAvatar);
      });
  }
  handleSubmit(makeRequest, evt);
}

// открытие попапа аватара
buttonEditAvatar.addEventListener('click', function () {
  clearValidation(popupEditAvatar)
  openModal(popupEditAvatar);
});

formEditAvatar.addEventListener('submit', handleAvatarFormSubmit);

// отправка формы карточки
function handleCardFormSubmit(evt) {
  function makeRequest() {
    return api.addCard(placeInput.value, urlInput.value)
      .then((card) => {
        cardsContainer.prepend(
          createCard(card, likeCard, showImage, openDeleteConfirmationPopup, profileId)
        );
        closeModal(popupAddCard);
      });
  }
  handleSubmit(makeRequest, evt)
}

// открытия попапа формы карточки
buttonAdd.addEventListener('click', function () {
  clearValidation(popupAddCard)
  openModal(popupAddCard);
});

formNewCard.addEventListener('submit', handleCardFormSubmit);

// отправка формы удаления
function handleConfirmDeleteSubmit(evt) {
  function makeRequest() {
    return api.deleteCard(cardToDelete.id)
      .then((result) => {
        removeCard(cardToDelete.element);
        closeModal(popupDeleteCard);
      });
  }
  handleSubmit(makeRequest, evt);
}

formDeletePlace.addEventListener('submit', handleConfirmDeleteSubmit);

// вывод и получение карт и данных)
Promise.all([api.getProfileInfo(), api.getInitialCards()])
  .then(([profileDetails, cards]) => {
    profileId = profileDetails._id;
    profileImage.style.backgroundImage = 'url(' + profileDetails.avatar + ')'; 
    profileTitle.textContent = profileDetails.name;
    profileDescription.textContent = profileDetails.about;

    cards.forEach((card) => {
      cardsContainer.append(createCard(card, likeCard, showImage, openDeleteConfirmationPopup, profileId));
    });
  })
  .catch((error) =>
    console.error("Ошибка получения данных по карточкам и профилю", error)
  );

enableValidation(validationConfig);
