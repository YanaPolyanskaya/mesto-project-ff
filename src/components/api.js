// ссылка на api и токен

const config = {
    url: "https://mesto.nomoreparties.co/v1/wff-cohort-8",
    headers: {
        authorization: "ef512834-9b26-41cd-a602-e09a810821d5",
        "Content-Type": "application/json",
    },
};

function sendRequest(action, method, bodyObj) {
    return fetch(`${config.url}/${action}`, {
        method: method,
        headers: config.headers,
        body: JSON.stringify(bodyObj),
    }).then((res) => {
        if (res.ok)
            return res.json();

        return Promise.reject(`Ошибка: ${res.status}`);
    });
}

function getProfileInfo() {
    return sendRequest('users/me', 'get');
}

function getInitialCards() {
    return sendRequest('cards', 'get');
}

function editProfileInfo(name, about) {
    return sendRequest('users/me', 'PATCH', {
        name: name,
        about: about
    });
}

function addCard(name, link) {
    return sendRequest('/cards', 'POST', {
        name: name,
        link: link
    });
}

function removeCard(cardId) {
    return sendRequest(`cards/${cardId}`, 'DELETE');
}

function updateAvatar(avatar) {
    return sendRequest('users/me/avatar', 'PATCH', { avatar: avatar });
}

function disLikeCard(cardId) {
    return sendRequest(`cards/likes/${cardId}`, 'DELETE');
}

function likeCard(cardId) {
    return sendRequest(`cards/likes/${cardId}`, 'PUT');
}

export {
    getProfileInfo,
    getInitialCards,
    editProfileInfo,
    addCard,
    removeCard,
    updateAvatar,
    disLikeCard,
    likeCard
};