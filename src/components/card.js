import { deleteCard, likeCard, disLikeCard } from "./api";

// функция создания карточки

function createCard(cardData, profileId, onDelete, onOpenImage) {
  const cardTemplate = document.querySelector("#card-template").content;
  const card = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImage = card.querySelector(".card__image");
  const cardDeleteButton = card.querySelector(".card__delete-button");
  const cardTitle = card.querySelector(".card__title");
  const cardLikeButton = card.querySelector(".card__like-button");
  const cardLikeCounter = card.querySelector(".card__like-counter");
  
  const isLiked = cardData.likes.some((likeItem) => likeItem._id === profileId);

  cardImage.src = cardData.link;
  cardTitle.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  if (cardData.owner._id === profileId) cardDeleteButton.style.display = "block";
  else cardDeleteButton.style.display = "none";

  if (isLiked) cardLikeButton.classList.add("card__like-button_is-active");
  else cardLikeButton.classList.remove("card__like-button_is-active");


  cardImage.addEventListener("click", () => onOpenImage(card));
  cardLikeButton.addEventListener("click", () => onLike(card, cardData));
  cardDeleteButton.addEventListener("click", () => onDelete(card, cardData));


  // cardDeleteButton.addEventListener("click", deleteCard);
  // cardLikeButton.addEventListener("click", likeCard);

  return card;
}

// функция лайка карточки

function chandeLikeCard(card, cardData) {
  const cardLikeButton = card.querySelector(".card__like-button"),
        cardLikeCounter = card.querySelector(".card__like-counter");

        if (cardLikeButton.classList.contains("card__like-button_is-active")) {
          disLikeCard(cardData._id)
          .then((data) => {
              cardLikeButton.classList.remove("card__like-button_is-active");
              cardLikeCounter.textContent = data.likes.length;
          })
          .catch((error) =>
             console.error("Ошибка при добавлении карточки:", error));}
        else {
          likeCard(cardData._id)
        .then((data) => {
          cardLikeButton.classList.add("card__like-button_is-active");
          cardLikeCounter.textContent = data.likes.length;
        })
        .catch((error) => console.error("Ошибка при добавлении карточки:", error));
      }
}

// function likeCard(evt) {
//   const card = evt.target.closest(".card");
//   const cardLikeButton = card.querySelector(".card__like-button");

//   cardLikeButton.classList.toggle("card__like-button_is-active");
// }

// функция удаления карточки

function deleteMyCard(card) {
  card.remove();
}

// function deleteCard(evt) {
//   const card = evt.target.closest(".card");

//   card.remove();
// }

// export { createCard, likeCard, deleteCard };
export { createCard, chandeLikeCard, deleteMyCard };