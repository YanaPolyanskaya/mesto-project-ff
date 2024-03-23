// функция создания карточки

function createCard(cardData, profileId, onDelete, onOpenImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector('.card__like-button');

  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;

  cardImage.addEventListener("click", () => onOpenImage(cardData.link, cardData.name));
  cardDeleteButton.addEventListener("click", () => onDelete(card, cardData));

  if (cardData.owner._id === profileId) {
    cardDeleteButton.addEventListener("click", () => onDelete(card, cardData));
  } else {
    cardDeleteButton.remove();
  }
  cardLikeButton.addEventListener("click", likeCard);

  return card;
}

// функция лайка карточки

// function changeLikeCard(card, cardData) {
//   const cardLikeButton = card.querySelector(".card__like-button"),
//         cardLikeCounter = card.querySelector(".card__like-counter");
//
//         if (cardLikeButton.classList.contains("card__like-button_is-active")) {
//           disLikeCard(cardData._id)
//           .then((data) => {
//               cardLikeButton.classList.remove("card__like-button_is-active");
//               cardLikeCounter.textContent = data.likes.length;
//           })
//           .catch((error) =>
//              console.error("Ошибка при добавлении карточки:", error));}
//         else {
//           likeCard(cardData._id)
//         .then((data) => {
//           cardLikeButton.classList.add("card__like-button_is-active");
//           cardLikeCounter.textContent = data.likes.length;
//         })
//         .catch((error) => console.error("Ошибка при добавлении карточки:", error));
//       }
// }

function likeCard(evt) {
  evt.target.classList.toggle("card__like-button_is-active");
}

// функция удаления карточки

function deleteCard(card) {
  card.remove();
}

// function deleteCard(evt) {
//   const card = evt.target.closest(".card");

//   card.remove();
// }

// export { createCard, likeCard, deleteCard };
export { createCard, deleteCard };