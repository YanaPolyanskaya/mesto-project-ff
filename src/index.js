import "./pages/index.css";
import {
  createCard,
  removeCardElement,
  toddleLikeCard,
  isActiveLikeButton,
} from "./components/card.js";
//import { initialCards } from "./components/cards.js";
import { openPopup, closePopup, closeByOverlay } from "./components/modal.js";
export { enableValidation, clearValidation } from "./components/validation.js";
import {
  updateAvatar,
  getProfileInfo,
  editProfileInfo,
  getInitialCards,
  addCard,
  removeCard,
  addLike,
  removeLike,
} from "./components/api.js";
import { enableValidation } from "./components/validation.js";

// DOM узлы

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  inputErrorClass: "popup__input_type_error",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  errorClass: "popup__error_visible",
};

let profileId;

const placesList = document.querySelector(".places__list");

const profileForm = document.querySelector('.popup__form[name="edit-profile"]'),
  profileNameInput = profileForm.querySelector(".popup__input_type_name"),
  profileJobInput = profileForm.querySelector(".popup__input_type_description");

const profile = document.querySelector(".profile"),
  profileTitle = document.querySelector(".profile__title"),
  profileDescription = document.querySelector(".profile__description"),
  profileEditButton = document.querySelector(".profile__edit-button"),
  profileAddButton = document.querySelector(".profile__add-button"),
  profileImage = document.querySelector(".profile__image");

const cardForm = document.querySelector('.popup__form[name="new-place"]'),
  cardName = cardForm.querySelector(".popup__input_type_card-name"),
  cardLink = cardForm.querySelector(".popup__input_type_url");

const popups = document.querySelectorAll(".popup"),
  popupEditProfile = document.querySelector(".popup_type_edit"),
  popupCloseProfile = popupEditProfile.querySelector(".popup__close"),
  popupFormProfile = document.forms["edit-profile"],
  popupFormNameProfile = popupFormProfile.elements.name,
  popupFormDescriptionProfile = popupFormProfile.elements.description,
  popupAvatar = document.querySelector(".popup_type_avatar"),
  popupAvatarClose = popupAvatar.querySelector(".popup__close"),
  popupAvatarForm = document.forms["edit-avatar"],
  popupAvatarFormLink = popupAvatarForm.elements.url,
  popupNewCard = document.querySelector(".popup_type_new-card"),
  popupCloseCard = popupNewCard.querySelector(".popup__close"),
  popupFormCard = document.forms["new-place"],
  popupFormNameCard = popupFormCard.elements["place-name"],
  popupFormLinkCard = popupFormCard.elements["link"],
  popupEditProfileButton = popupEditProfile.querySelector(".popup__button"),
  popupImageContainer = document.querySelector(".popup_type_image"),
  popupImageClose = popupImageContainer.querySelector(".popup__close"),
  popupImage = popupImageContainer.querySelector(".popup__image"),
  popupCaption = popupImageContainer.querySelector(".popup__caption");

const save = "Сохранение...";

const openImage = (placeName, link) => {
  openPopup(popupImageContainer);
  popupImage.src = link;
  popupCaption.textContent = placeName;
};

const editAvatar = (url) => {
  profileImage.style.backgroundImage = `url(${encodeURI(url)})`;
};

const startProfile = (profile) => {
  profileId = profile._id;
  profileTitle.textContent = profile.name;
  profileDescription.textContent = profile.about;
  editAvatar(profile.avatar);
};

const startCards = (cards) => {
  cards.forEach((card) => {
    const newCard = addCard(
      card,
      profileId,
      handleRemoveCard,
      handleLikeCard,
      openPopup
    );
    placesList.append(newCard);
  });
};

const handleProfileEdit = () => {
  openPopup(popupEditProfile);
  popupFormNameProfile.value = profileTitle.textContent;
  popupFormDescriptionProfile.value = profileDescription.textContent;
  clearValidation(popupFormProfile, validationConfig);
};

const handleProfileCloseButton = () => {
  closePopup(popupEditProfile);
};

const handleProfileEditForm = async (evt) => {
  evt.preventDefault();
  const currentSubmitButtonText = evt.submitter.textContent;
  try {
    evt.submitter.textContent = save;
    const profile = await editProfileInfo(
      popupFormNameProfile.value,
      popupFormDescriptionProfile.value
    );

    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;

    popupFormProfile.reset();
    closePopup(popupEditProfile);
  } catch (ex) {
    console.log(`Произошла ошибка при обновлении данных профиля: ${ex}`);
  } finally {
    evt.submitter.textContent = currentSubmitButtonText;
  }
};

const handleProfileImage = () => {
  popupAvatarForm.reset();
  clearValidation(popupAvatarForm, validationConfig);
  openPopup(popupAvatar);
};

const handleAvatarEditForm = async (evt) => {
  evt.preventDefault();
  const currentSubmitButtonText = evt.submitter.textContent;
  try {
    evt.submitter.textContent = save;
    const profile = await updateAvatar(popupAvatarFormLink.value);
    editAvatar(profile.avatar);
    closePopup(popupAvatar);
  } catch (ex) {
    console.log(`Произошла ошибка при обновлении аватара: ${ex}`);
  } finally {
    evt.submitter.textContent = currentSubmitButtonText;
  }
};

const handleAvatarEdit = () => {
  closePopup(popupAvatar);
};

const handleCardAddButton = () => {
  openPopup(popupNewCard);
};

const handleCardAddCloseButton = () => {
  closePopup(popupNewCard);
};

const handleCardAddForm = async (evt) => {
  evt.preventDefault();
  const currentSubmitButtonText = evt.submitter.textContent;

  try {
    evt.submitter.textContent = save;
    const card = await addCard({
      name: popupFormNameCard.value,
      link: popupFormLinkCard.value,
    });
    const cardElement = addCard(
      card,
      profileId,
      handleRemoveCard,
      handleLikeCard,
      openPopup
    );
    placesList.prepend(cardElement);
    popupFormCard.reset();
    closePopup(popupNewCard);
    clearValidation(popupFormCard, validationConfig);
  } catch (ex) {
    console.log(`Произошла ошибка при создании карточки: ${ex}`);
  } finally {
    evt.submitter.textContent = currentSubmitButtonText;
  }
};

const handleCardImageCloseButton = () => {
  closePopup(popupImageContainer);
};

const handleRemoveCard = async (card, cardElement) => {
  try {
    await removeCard(card._id);
    removeCardElement(cardElement);
  } catch (ex) {
    console.log(`Произошла ошибка при удалении карточки: ${ex}`);
  }
};

const handleLikeCard = async (cardId, likeCountElement, likeButton) => {
  try {
    const card = isActiveLikeButton(likeButton)
      ? await removeLike(cardId)
      : await addLike(cardId);

    likeCountElement.textContent = card.likes.length;
    toddleLikeCard(likeButton);
  } catch (ex) {
    console.log(
      `Произошла ошибка при изменении количества лайков у карточки: ${ex}`
    );
  }
};

// обрботчики событий

profileEditButton.addEventListener("click", handleProfileEdit);
popupEditProfile.addEventListener("mousedown", closeByOverlay);
popupCloseProfile.addEventListener("click", handleProfileCloseButton);
popupFormProfile.addEventListener("submit", handleProfileEditForm);

profileImage.addEventListener("click", handleProfileImage);
popupAvatar.addEventListener("mousedown", closeByOverlay);
popupAvatarClose.addEventListener("click", handleAvatarEdit);
popupAvatarForm.addEventListener("submit", handleAvatarEditForm);

profileAddButton.addEventListener("click", handleCardAddButton);
popupNewCard.addEventListener("mousedown", closeByOverlay);
popupCloseCard.addEventListener("click", handleCardAddCloseButton);
popupFormCard.addEventListener("submit", handleCardAddForm);

popupImageContainer.addEventListener("mousedown", closeByOverlay);
popupImageClose.addEventListener("click", handleCardImageCloseButton);

const executionTime = () => {
  Promise.all([getInitialCards(), getProfileInfo()])
    .then((result) => {
      startProfile(result[1]);
      startCards(result[0]);
    })
    .catch((ex) =>
      console.log(`Произошла ошибка при инициализации данных: ${ex}`)
    );
};

document
  .querySelectorAll(".popup")
  .forEach((popupElement) => popupElement.classList.add("popup_is-animated"));
executionTime();
enableValidation(validationConfig);
