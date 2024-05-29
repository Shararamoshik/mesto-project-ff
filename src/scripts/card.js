// @todo: Функция создания карточки
function createCard(cardData, deleteCard, cardTemplate, likeCard, showImage){
  const card = cardTemplate.content.cloneNode(true);
  card.querySelector('.card__image').src = cardData.link;
  card.querySelector('.card__image').alt = `На фото изображено место ${cardData.name}`;
  card.querySelector('.card__title').textContent = cardData.name;
  card.querySelector('.card__delete-button').addEventListener('click', deleteCard);
  card.querySelector('.card__like-button').addEventListener('click', likeCard)
  card.querySelector('.card__image').addEventListener('click', () => showImage(cardData));
  return card
}
// @todo: Функция удаления карточки
function deleteCard(evt){ 
  const card = evt.target.closest('.card'); 
  card.remove(); 
} 

function likeCard(evt) {
  evt.target.classList.toggle('card__like-button_is-active')
}

export {deleteCard,createCard,likeCard};