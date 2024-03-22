import "./pages/index.css";
import { createCard, chandeLikeCard, deleteMyCard } from "./components/card";
//import { initialCards } from "./components/cards.js";
import { openPopup, closePopup, closeByOverlay } from "./components/modal";
import { enableValidation, clearValidation } from "./components/validation";
import {
  updateAvatar,
  getProfileInfo,
  editProfileInfo,
  getInitialCards,
  addCard,
  deleteCard,
} from "./components/api";

// DOM узлы

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  errorClass: "popup__error_visible",
};

let profileId = null;

const placesList = document.querySelector(".places__list");

const profileForm = document.querySelector('.popup__form[name="edit-profile"]'),
  profileNameInput = profileForm.querySelector(".popup__input_type_name"),
  profileJobInput = profileForm.querySelector(".popup__input_type_description");

const profile = document.querySelector(".profile"),
  profileTitle = profile.querySelector(".profile__title"),
  profileDescription = profile.querySelector(".profile__description"),
  profileEditButton = profile.querySelector(".profile__edit-button"),
  profileAddButton = profile.querySelector(".profile__add-button"),
  profileAvatarEditButton = profile.querySelector(".profile__image");

const cardForm = document.querySelector('.popup__form[name="new-place"]'),
  cardName = cardForm.querySelector(".popup__input_type_card-name"),
  cardLink = cardForm.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup"),
  popupEditProfile = document.querySelector(".popup_type_edit"),
  // popupEditProfileButton = popupEditProfile.querySelector(
  //   validationConfig.submitButtonSelector
  // ),
  popupEditProfileButton = popupEditProfile.querySelector(".popup__button"),
  popupNewCard = document.querySelector(".popup_type_new-card"),
  // popupNewCardButton = popupNewCard.querySelector(
  //   validationConfig.submitButtonSelector
  // ),
  popupNewCardButton = popupNewCard.querySelector(".popup__button"),
  popupImageContainer = document.querySelector(".popup_type_image"),
  popupImage = popupImageContainer.querySelector(".popup__image"),
  popupCaption = popupImageContainer.querySelector(".popup__caption"),
  popupAvatar = document.querySelector(".popup_type_edit_avatar"),
  // popupAvatarButton = popupAvatar.querySelector(
  //   validationConfig.submitButtonSelector
  // );
  popupAvatarButton = popupAvatar.querySelector(".popup__button");

const avatarForm = document.querySelector('.popup__form[name="avatar"]'),
  avatarLink = avatarForm.querySelector(".popup__input_type_url");

// вывести карточки на страницу и данные профиля

// initialCards.forEach((cardItem) =>
//   placesList.append(createCard(cardItem, openCard, likeCard, deleteCard))
// );

Promise.all([getProfileInfo(), getInitialCards()])
  .then(([profileData, cardsData]) => {
    profileId = profileData._id;

    profileAvatarEditButton.style.backgroundImage = `url(\\${profileData.avatar})`;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;

    cardsData.forEach((cardData) => {
      placesList.append(
        createCard(cardData, profileId, chandeLike, removeCard, onOpenImage)
      );
    });
  })
  .catch((error) =>
    console.error("Ошибка при получении данных пользователя:", error)
  );

// форма редактирования аватарки

function handleAvatarFormSubmit(evt) {
  evt.preventDefault();
  const originalButtonText = popupAvatarButton.textContent;

  popupAvatarButton.textContent = "Сохранение...";

  updateAvatar(avatarLink.value)
    .then((profileData) => {
      profileAvatarEditButton.style.backgroundImage = `url(\\${profileData.avatar})`;

      closePopup(popupAvatar);
    })

    .catch((error) =>
      console.error("Ошибка при получении данных пользователя", error)
    )

    .finally(() => (popupAvatarButton.textContent = originalButtonText));

  clearValidation(avatarForm, validationConfig);
}

// изменить имя и био профиля

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const originalButtonText = popupEditProfileButton.textContent;

  popupEditProfileButton.textContent = "Сохранение...";

  editProfile(profileNameInput.value, profileJobInput.value)
    .then((profileData) => {
      profileTitle.textContent = profileData.name;
      profileDescription.textContent = profileData.about;

      closePopup(popupEditProfile);
    })

    .catch((error) =>
      console.error("Ошибка при получении данных пользователя:", error)
    )

    .finally(() => (popupEditProfileButton.textContent = originalButtonText));

  clearValidation(profileForm, validationConfig);
}

// форма добавления карточки

function handleNewCardFormSubmit(evt) {
  evt.preventDefault();

  const originalButtonText = popupNewCardButton.textContent;
  popupNewCardButton.textContent = "Добавление...";

  addCard(cardName.value, cardLink.value)
    .then((cardData) => {
      const newCard = createCard(
        cardData,
        profileId,
        changeLike,
        removeCard,
        onOpenImage
      );

      placesList.prepend(newCard);

      closePopup(popupNewCard);

      cardForm.reset();
    })

    .catch((error) => console.error("Ошибка при добавлении карточки:", error))

    .finally(() => (popupNewCardButton.textContent = originalButtonText));

  clearValidation(profileForm, validationConfig);
}

// cardForm.addEventListener("submit", handleNewCardFormSubmit);

// удалить свою карточку

function removeCard(card, cardData) {
  deleteCard(cardData._id)
    .then(() => deleteMyCard(card))
    .catch((error) => console.error("Ошибка при добавлении карточки:", error));
}

// функция редактирования имени и инфо

// function handleProfileFormSubmit(evt) {
//   evt.preventDefault();

//   const originalButtonText = popupEditProfileButton.textContent;

//   popupEditProfileButton.textContent = "Сохранение...";

//   editProfile(profileNameInput.value, profileJobInput.value)
//     .then((profileData) => {
//       profileTitle.textContent = profileData.name;
//       profileDescription.textContent = profileData.about;

//       // profileTitle.textContent = profileNameInput.value;
//       // profileDescription.textContent = profileJobInput.value;

//       closePopup(popupEditProfile);
//     })
//     .catch((error) =>
//       console.error("Ошибка при получении данных пользователя:", error)
//     )

//     .finally(() => (popupEditProfileButton.textContent = originalButtonText));

//   clearValidation(profileForm, validationConfig);
// }

// открыть изображение

function onOpenImage(cardData) {
  const newCard = cardData.closest(".card"),
    cardImage = newCard.querySelector(".card__image"),
    cardTitle = newCard.querySelector(".card__title");

  popupImage.src = cardImage.src;
  popupImage.alt = cardTitle.alt;
  popupCaption.textContent = cardTitle.textContent;

  openPopup(popupImageContainer);
}

// исходные данные в попапах

function openEditAvatarPopup() {
  avatarLink.value = profileAvatarEditButton.style.backgroundImage.replace(
    /url\(["']?(.*?)["']?\)/,
    "$1"
  );

  openPopup(popupAvatar);
}

function openEditProfilePopup() {
  profileNameInput.value = profileTitle.textContent;
  profileJobInput.value = profileDescription.textContent;

  openPopup(profileEditProfile);
}

// обработчики событий

avatarForm.addEventListener("submit", handleAvatarFormSubmit);
profileForm.addEventListener("submit", handleProfileFormSubmit);
cardForm.addEventListener("submit", handleNewCardFormSubmit);

profileAvatarEditButton.addEventListener("click", () => openEditAvatarPopup());

profileEditButton.addEventListener("click", () => openEditProfilePopup());
profileAddButton.addEventListener("click", () => openPopup(popupNewCard));

popups.forEach((popup) => {
  popup.addEventListener("mousedown", closeByOverlay);
});

// вызов функций валидации форм

enableValidation(validationConfig);

clearValidation(avatarForm, validationConfig);
clearValidation(profileForm, validationConfig);
clearValidation(cardForm, validationConfig);

// function openCard(link, name) {
//   popupImage.src = link;
//   popupCaption.textContent = name;

//   openPopup(popupImageContainer);
// }

// profileForm.addEventListener("submit", handleProfileFormSubmit);
// cardForm.addEventListener("submit", handleNewCardFormSubmit);

// profileEditButton.addEventListener("click", () => {
//   profileNameInput.value = profileTitle.textContent;
//   profileJobInput.value = profileDescription.textContent;

//   openPopup(popupEditProfile);
// });

// profileAddButton.addEventListener("click", () => openPopup(popupNewCard));

// popups.forEach((popup) => {
//   popup.addEventListener("mousedown", closeByOverlay);
// });
