// import "./cards.js";

// @todo: Темплейт карточки

const cardTemplate = document.querySelector("#card-template").content;

// @todo: DOM узлы

const placesList = document.querySelector(".places__list");

// @todo: Функция создания карточки

function renderCards(imageName, imageLink) {
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector("card__delete-button");
  const cardDescription = card.querySelector("card__description");
  const cardTitle = cardDescription.querySelector("card__title");
  const cardLikeButton = cardDescription.querySelector("card__like-button");

  cardImage.src = `url(${imageLink})`;
  cardTitle.textContent = imageName;

  // @todo: Функция удаления карточки

  removeCard.addEventListener("click", () => {
    card.removeCard();
  });

  return card;
}
renderCards();
// @todo: Вывести карточки на страницу

initialCards.forEach((card) =>
  placesList.appendChild(renderCards(card.name, card.link))
);