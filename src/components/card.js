// import { deleteCard, likeCard, disLikeCard } from "./api";

// функция создания карточки
const cardTemplate = document.querySelector("#card-template").content;
const cardTemplateElement = cardTemplate.querySelector(".card");

const createCard = (card, profileId, removeCard, likeCard, OpenImage) => {
  const cardElement = cardTemplateElement.cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  const cardDeleteButton = cardElement.querySelector(".card__delete-button");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like-button");
  const cardLikeCount = cardElement.querySelector(".card__like-count");
  
  cardImage.src = card.link;
  cardTitle.textContent = card.name;
  cardLikeCount.textContent = card.likes.length ? card.likes.length : '';

  if (card.owner._id === profileId) 
  cardDeleteButton.addEventListener('click', () => removeCard(card, cardElement));
  else 
  cardElement.removeChild(cardDeleteButton);

  if (card.likes.some(like => like._id === profileId)) 
  toddleLikeCard(cardLikeButton);


  return cardElement;
}

// функция удаления карточки

const removeCardElement = cardElement =>{
  cardElement.remove();
}
  
const toddleLikeCard = likeButton => {
  likeButton.clasaList.toggle('card__like-button_is-active');
}

const isActiveLikeButton = likeButton => {
  return likeButton.classList.contains('card__like-button_is-active');
}

export { createCard, removeCardElement, toddleLikeCard, isActiveLikeButton };