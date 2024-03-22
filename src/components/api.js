// ссылка на api и токен

const config = {
  url: 'https://nomoreparties.co/v1/wff-cohort-8',
  headers: {
    authorization: 'ef512834-9b26-41cd-a602-e09a810821d5',
    'Content-Type': 'application/json'
  }
}

const sendRequest = async (action, method, bodyObj) => {
  const actionUrl = `${config.url}/${action}`;
  const res = await fetch(actionUrl, {
    method: method,
    headers: config.headers,
    body: JSON.stringify(bodyObj)
  });

  if (!res.ok) {
    throw new Error(
      `Запрос по адресу \'${actionUrl}\' вернул код состояния \'${res.status}\'.`
    );
  }

  return await res.json();
};

// данные профиля

const getRequest = async (action) => {
  return await sendRequest(action, "GET");
};

const getProfileInfo = async () => {
  return await getRequest("user/me");
};

const deleteRequest = async (action) => {
  return await sendRequest(action, "DELETE");
};

const removeCard = async (id) => {
  return await deleteRequest(`cards/${id}`);
};

const postRequest = async (action, bodyObj) => {
  return await sendRequest(action, "POST", bodyObj);
};

const addCard = async (card) => {
  return await postRequest('cards', {
    name: card.name,
    link: encodeURI(card.link),
  });
};

const putRequest = async (action, bodyObj) => {
  return await sendRequest(action, "PUT", bodyObj);
};

const patchRequest = async (action, body) => {
  return await sendRequest(action, "PATCH", bodyObj);
};

const editProfileInfo = async (name, about) => {
  return await patchRequest("user/me", {
    name,
    about,
  });
};

const getInitialCards = async () => {
  return await getRequest("cards");
};

const addLike = async (id) => {
  return await putRequest(`cards/${id}`);
};

const removeLike = async (id) => {
  return await deleteRequest(`cards/likes/${id}`);
};

const updateAvatar = async (url) => {
  return await patchRequest(`users/me/avatar`, {
    avatar: encodeURI(url),
  });
};


export {
  getProfileInfo,
  removeCard,
  editProfileInfo,
  getInitialCards,
  addLike,
  removeLike,
  updateAvatar,
  addCard
};