const cardTemplate = document.querySelector('#card-template');

const cardList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(initialCard){
  const card = cardTemplate.content.cloneNode(true);
  card.querySelector('.card__image').setAttribute('src', initialCard.link);;
  card.querySelector('.card__title').textContent = initialCard.name;
  card.querySelector('.card__delete-button').addEventListener('click', removeCard);
  
  return card
}
// @todo: Функция удаления карточки
function removeCard(evt){
  const eventTarget = evt.target;
  const cardItem = eventTarget.closest('card');
  cardItem.remove();
}
// @todo: Вывести карточки на страницу
initialCards.forEach(element => {
  cardList.append(createCard(element, removeCard));
})