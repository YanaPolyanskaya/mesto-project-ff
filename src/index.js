import "./pages/index.css";
import {
  initialCards,
  renderCards,
  likeCard,
  deleteCard,
} from "./components/cards.js";
import {
  openPopup,
  closePopup,
  closeByEscape,
  closeByOverlay,
} from "./components/modal.js";

// DOM узлы

const placesList = document.querySelector(".places__list");

const formElement = document.querySelector('.popup__form[name="edit-profile"]'),
  nameInput = formElement.querySelector(".popup__input_type_name"),
  jobInput = formElement.querySelector(".popup__input_type_description");

const profile = document.querySelector(".profile"),
  profileTitle = profile.querySelector(".profile__title"),
  profileDescription = profile.querySelector(".profile__description"),
  profileEditButton = profile.querySelector(".profile__edit-button"),
  profileAddButton = profile.querySelector(".profile__add-button");

const cardForm = document.querySelector('.popup__form[name="new-place"]'),
  cardName = cardForm.querySelector(".popup__input_type_card-name"),
  cardLink = cardForm.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup"),
  popupEditProfile = document.querySelector(".popup_type_edit"),
  popupNewCard = document.querySelector(".popup_type_new-card"),
  popupImageContainer = document.querySelector(".popup_type_image"),
  popupImage = popupImageContainer.querySelector(".popup__image"),
  popupCaption = popupImageContainer.querySelector(".popup__caption");

// вывести карточки на страницу

initialCards.forEach((cardItem) =>
  placesList.append(renderCards(cardItem, openCard, likeCard, deleteCard))
);

// форма добавления карточки

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = renderCards(
    { name: cardName.value, link: cardLink.value },
    openCard,
    likeCard,
    deleteCard
  );

  placesList.prepend(newCard);

  closePopup(popupNewCard);
  cardForm.reset();
}

cardForm.addEventListener("submit", handleNewCardFormSubmit);

// функция редактирования имени и инфо

function handleFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

// открыть изображение

function openCard(evt) {
  const card = evt.target.closest(".card"),
    cardImage = card.querySelector(".card__image"),
    cardTitle = card.querySelector(".card__title");

  popupImage.src = cardImage.src;
  popupCaption.textContent = cardTitle.textContent;

  openPopup(popupImageContainer);
}

formElement.addEventListener("submit", handleFormSubmit);
cardForm.addEventListener("submit", handleNewCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
});

profileAddButton.addEventListener("click", () => openPopup(popupNewCard));

popups.forEach((popup) => {
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.matches(".popup_is-opened, .popup__close"))
      closePopup(popup);
  });
});
