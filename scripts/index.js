const cardTemplate = document.querySelector('#card-template');

const cardsContainer = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(cardData, onDelete){
  const card = cardTemplate.content.cloneNode(true);
  card.querySelector('.card__image').src = cardData.link;
  card.querySelector('.card__image').alt = `На фото изображено место ${cardData.name}`;
  card.querySelector('.card__title').textContent = cardData.name;
  card.querySelector('.card__delete-button').addEventListener('click', onDelete);
  return card
}
// @todo: Функция удаления карточки
function onDelete(evt){ 
  const eventTarget = evt.target; 
  const card = eventTarget.closest('.card'); 
  card.remove(); 
} 
// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
  cardsContainer.append(createCard(element, onDelete));
})