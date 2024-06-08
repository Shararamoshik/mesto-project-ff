import * as api from "./api.js";

// создания карточки
const cardTemplate = document.querySelector("#card-template").content;
export function createCard(card, likeCard, showImage, openDeleteConfirmationPopup, profileId) {
  const cardElement = cardTemplate.cloneNode(true);
  const deleteButton = cardElement.querySelector('.card__delete-button');
  const currentCard = cardElement.querySelector(".card");
  const likeButton = cardElement.querySelector(".card__like-button");
  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeNumber = cardElement.querySelector(".card__like-number");
  const isLiked = card.likes.some((item) => item._id === profileId);

  cardTitle.textContent = card.name;
  cardImage.src = card.link;
  cardImage.alt = card.name;

  if (isLiked) {
    likeButton.classList.add("card__like-button_is-active");
  } else {
    likeButton.classList.remove("card__like-button_is-active");
  }

  cardLikeNumber.textContent = card.likes.length;

  if (card.owner._id === profileId) {
    deleteButton.addEventListener("click", () => openDeleteConfirmationPopup(card._id, currentCard));
  } else {
    deleteButton.remove();
  }
  
  likeButton.addEventListener('click', () => likeCard(card._id, currentCard));

  cardImage.addEventListener('click', () => showImage(card));

  return cardElement;
}

// удаления карточки
export function removeCard(currentCard) {
  currentCard.remove();
} 

// функция лайка
export function likeCard(cardId, currentCard) {
  const likeButton = currentCard.querySelector(".card__like-button");
  const cardLikeNumber = currentCard.querySelector(".card__like-number");

  if (likeButton.classList.contains("card__like-button_is-active")) {
    api
      .deleteLike(cardId)
      .then((res) => {
        likeButton.classList.remove("card__like-button_is-active");
        cardLikeNumber.textContent = res.likes.length;
      })
      .catch((err) => console.error(`Не удалось удалить лайк ${err}`));
  } else {
    api
      .addLike(cardId)
      .then((res) => {
        likeButton.classList.toggle("card__like-button_is-active");
        cardLikeNumber.textContent = res.likes.length;
      })
      .catch((err) => console.error(`Не удалось добавить лайк ${err}`));
  }
}