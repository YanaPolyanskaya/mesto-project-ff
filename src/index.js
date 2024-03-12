import "./pages/index.css";
import { createCard, likeCard, deleteCard } from "./components/card.js";
import { initialCards } from "./components/cards.js";
import { openPopup, closePopup, closeByOverlay } from "./components/modal.js";

// DOM узлы

const placesList = document.querySelector(".places__list");

const profileForm = document.querySelector('.popup__form[name="edit-profile"]'),
  nameInput = profileForm.querySelector(".popup__input_type_name"),
  jobInput = profileForm.querySelector(".popup__input_type_description");

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
  placesList.append(createCard(cardItem, openCard, likeCard, deleteCard))
);

// форма добавления карточки

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const newCard = createCard(
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

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closePopup(popupEditProfile);
}

// открыть изображение

function openCard(link, name) {
  popupImage.src = link;
  popupCaption.textContent = name;

  openPopup(popupImageContainer);
}

profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleNewCardFormSubmit);

profileEditButton.addEventListener("click", () => {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;

  openPopup(popupEditProfile);
});

profileAddButton.addEventListener("click", () => openPopup(popupNewCard));

popups.forEach((popup) => {
  popup.addEventListener("mousedown", closeByOverlay);
});
