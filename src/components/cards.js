const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// функция создания карточки

function renderCards(cardAtribute, openCard, likeCard, deleteCard) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");

  cardImage.src = cardAtribute.link;
  cardTitle.textContent = cardAtribute.name;

  cardImage.addEventListener("click", openCard);
  cardDeleteButton.addEventListener("click", deleteCard);
  cardLikeButton.addEventListener("click", likeCard);

  return card;
}

// функция лайка карточки

function likeCard(evt) {
  const card = evt.target.closest(".card");
  const cardLikeButton = card.querySelector(".card__like-button");

  cardLikeButton.classList.toggle("card__like-button_is-active");
}

// функция удаления карточки

function deleteCard(evt) {
  const card = evt.target.closest(".card");

  card.remove();
}

export { initialCards, renderCards, likeCard, deleteCard };
