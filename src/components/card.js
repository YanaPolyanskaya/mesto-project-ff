import {disLikeCard, likeCard, removeCard} from "./api";

function createCard(cardData, profileId, onOpenImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector('.card__like-button');
  const countLikeElement = card.querySelector('.card__like-button_couter');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardImage.addEventListener("click", () => onOpenImage(cardData.link, cardData.name));

  if (cardData.owner._id === profileId) {
    cardDeleteButton.addEventListener("click", () => removeCardCallback(card, cardData));
  } else {
    cardDeleteButton.remove();
  }
  cardLikeButton.addEventListener("click", () => likeCardCallback(cardData._id, countLikeElement, cardLikeButton));

  const isLikedCurrentCard = cardData.likes.some(like => like._id === profileId);

  if (isLikedCurrentCard)
    toggleLikeCard(cardLikeButton);

  countLikeElement.textContent = cardData.likes.length;

  return card;
}

function isLikedCard(likeButtonElement) {
  return likeButtonElement.classList.contains('card__like-button_is-active');
}

function toggleLikeCard(likeButton) {
  likeButton.classList.toggle("card__like-button_is-active");
}

function deleteCard(card) {
  card.remove();
}

function removeCardCallback(cardElement, cardData) {
  removeCard(cardData._id)
      .then(() => deleteCard(cardElement))
      .catch((error) => console.error('Ошибка при удалении карточки:', error));
}

function likeCardCallback(cardId, likeCountElement, likeButton) {
  if (isLikedCard(likeButton)) {
    disLikeCard(cardId).then(card => {
      likeCountElement.textContent = card.likes.length;
      toggleLikeCard(likeButton);
    }).catch((error) => console.error('Ошибка при дизлайке карточки: ', error))
  } else {
    likeCard(cardId).then(card => {
      likeCountElement.textContent = card.likes.length;
      toggleLikeCard(likeButton);
    }).catch((error) => console.error('Ошибка при лайке карточки: ', error))
  }
}

export { createCard };