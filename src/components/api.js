// ссылка на api и токен

const config = {
  url: "https://mesto.nomoreparties.co/v1/wff-cohort-8",
  headers: {
    authorization: "ef512834-9b26-41cd-a602-e09a810821d5",
    "Content-Type": "application/json",
  },
};

// получение данных

function checkAnswer(res) {
  if (res.ok) return res.json();

  return Promise.reject(`Ошибка: ${res.status}`);
}

// отправка аватарки

function updateAvatar(avatar) {
  return fetch(`${config.url}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ avatar }),
  }).then((res) => checkAnswer(res));
}

// данные профиля

function getProfileInfo() {
  return fetch(`${config.url}/users/me`, {
    // method: "GET",
    headers: config.headers,
  }).then((res) => checkAnswer(res));
}

// отправка отредактированных данных

function editProfileInfo(name, about) {
  return fetch(`${config.url}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({ 
      name: name,
      about: about,
    }),
  }).then((res) => checkAnswer(res));
}

// получение отредактированных данных

function getInitialCards() {
  return fetch(`${config.url}/cards`, {
    headers: config.headers,
  }).then((res) => checkAnswer(res));
}

// отправка новой карточки

function addCard(name, link) {
  return fetch(`${config.url}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  }).then((res) => checkAnswer(res));
}

// удаление текущей карточки

function deleteCard(cardId) {
  return fetch(`${config.url}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkAnswer(res));
}

// лайк текущей карточки

function likeCard(cardId) {
  return fetch(`${config.url}/cards/likes${cardId}`, {
    method: "PUT",
    headers: config.headers,
  }).then((res) => checkAnswer(res));
}

// удаление лайка текущей карточки

function disLikeCard(cardId) {
  return fetch(`${config.url}/cards/likes${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => checkAnswer(res));
}

export {
  updateAvatar,
  getProfileInfo,
  editProfileInfo,
  getInitialCards,
  addCard,
  deleteCard,
  likeCard,
  disLikeCard,
};

// return fetch('https://nomoreparties.co/v1/cohort-42/cards', {
//   headers: {
//     authorization: 'c56e30dc-2883-4270-a59e-b2f7bae969c6'
//   }
// })
//   .then(res => res.json())
//   .then((result) => {
//     console.log(result);
//   });
