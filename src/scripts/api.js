const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-14',
  headers: {
    authorization: '40896f1e-dae8-4c04-92da-9811f2a37340',
    'Content-Type': 'application/json'
  }
};

// проверка ответа от сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
};

// получение данных профиля
export const getProfileInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
  .then((res) => checkResponse(res));
};

// получение данных карточек
export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
  .then((res) => checkResponse(res));
};

// изменение данных профиля
export const changeProfileInfo = (username, description) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: username,
      about: description 
    })
  })
  .then((res) => checkResponse(res));
};

// добавление карточки
export const addCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name,
      link
    })
  })
  .then((res) => checkResponse(res));
};

// удаление карточки
export const deleteCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => checkResponse(res));
};

// установка аватарки
export const setAvatar = (avatarLink) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({avatar: avatarLink})
  })
  .then((res) => checkResponse(res));
};

// управление лайком
export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'PUT',
    headers: config.headers
  })
  .then((res) => checkResponse(res));
};
export const deleteLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then((res) => checkResponse(res));
};