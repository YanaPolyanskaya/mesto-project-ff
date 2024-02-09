// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function renderCards(cardAtribute, deleteCard) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  //   const cardDescription = card.querySelector(".card__description");
  const cardTitle = card.querySelector(".card__title");
  //   const cardLikeButton = card.querySelector(".card__like-button");

  cardImage.src = cardAtribute.link;
  cardTitle.textContent = cardAtribute.name;

  cardDeleteButton.addEventListener("click", deleteCard);

  return card;
}

// @todo: Функция удаления карточки

function deleteCard(evt) {
  const card = evt.target.closest(".card");
  card.remove();
}

// @todo: Вывести карточки на страницу

initialCards.forEach((cardItem) =>
  placesList.append(renderCards(cardItem, deleteCard))
);
