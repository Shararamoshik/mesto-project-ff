// @todo: Функция создания карточки
function createCard(cardData, onDelete, cardTemplate, like, showImage){
  const card = cardTemplate.content.cloneNode(true);
  card.querySelector('.card__image').src = cardData.link;
  card.querySelector('.card__image').alt = `На фото изображено место ${cardData.name}`;
  card.querySelector('.card__title').textContent = cardData.name;
  card.querySelector('.card__delete-button').addEventListener('click', onDelete);
  card.querySelector('.card__like-button').addEventListener('click', like)
  card.querySelector('.card__image').addEventListener('click', () => showImage(cardData));
  return card
}
// @todo: Функция удаления карточки
function onDelete(evt){ 
  const eventTarget = evt.target; 
  const card = eventTarget.closest('.card'); 
  card.remove(); 
} 

function like(evt) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle('card__like-button_is-active')
}

export {onDelete,createCard,like};