import '../pages/index.css';
import { createCard, deleteCard } from '../components/card';
import { openPopup, closePopup, closeByOverlay } from '../components/modal';
import { enableValidation, clearValidation } from '../components/validation';
import {
    getProfileInfo,
    getInitialCards,
    editProfileInfo,
    addCard,
    removeCard,
    updateAvatar
} from '../components/api';

const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    inputErrorClass: 'popup__input_type_error',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    errorClass: 'popup__error_visible',
};

const popups = document.querySelectorAll('.popup');
const placesList = document.querySelector('.places__list');

const popupEditProfile = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const popupEditProfileForm = document.querySelector('.popup__form[name="edit-profile"]');
const popupEditProfileNameInput = popupEditProfileForm.querySelector('.popup__input_type_name');
const popupEditProfileJobInput = popupEditProfileForm.querySelector('.popup__input_type_description');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileAvatar = document.querySelector('.profile__image');
const popupEditProfileCloseButton = popupEditProfile.querySelector('.popup__close');

const addCardButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupAddCardCloseButton = popupAddCard.querySelector('.popup__close');
const popupAddCardForm = document.querySelector('.popup__form[name="new-place"]');
const popupAddCardName = popupAddCardForm.querySelector('.popup__input_type_card-name');
const popupAddCardLink = popupAddCardForm.querySelector('.popup__input_type_url');

const popupCardView = document.querySelector('.popup_type_image');
const popupCardViewImage = popupCardView.querySelector('.popup__image');
const popupCardViewCaption = popupCardView.querySelector('.popup__caption');
const popupCardViewCloseButton = popupCardView.querySelector('.popup__close');

const popupEditAvatar = document.querySelector('.popup_type_avatar');
const popupEditAvatarForm = popupEditAvatar.querySelector('.popup__form[name="edit-avatar"]');
const avatarLink = popupEditAvatarForm.querySelector('.popup_type_avatar_url');
const popupAvatarCloseButton = popupEditAvatar.querySelector('.popup__close');

let profileId;


popups.forEach((popup) => {
    popup.addEventListener('mousedown', closeByOverlay);
});


const handleOnClickCloseProfileEditPopup = () => closePopup(popupEditProfile);
popupEditProfileCloseButton.addEventListener('click', handleOnClickCloseProfileEditPopup);


editProfileButton.addEventListener('click', () => openEditProfilePopup());

function openEditProfilePopup() {
    popupEditProfileNameInput.value = profileTitle.textContent;
    popupEditProfileJobInput.value = profileDescription.textContent;

    clearValidation(popupEditProfileForm, validationConfig);
    openPopup(popupEditProfile);
}


popupEditProfileForm.addEventListener('submit', handleProfileFormSubmit);

function handleProfileFormSubmit(evt) {
    evt.preventDefault();
    const originalButtonText = evt.submitter.textContent;

    evt.submitter.textContent = 'Сохранение...';

    editProfileInfo(popupEditProfileNameInput.value, popupEditProfileJobInput.value)
        .then((profileData) => {
            debugger
            profileTitle.textContent = profileData.name;
            profileDescription.textContent = profileData.about;
            closePopup(popupEditProfile);
        })
        .catch((error) => console.error('Ошибка при получении данных пользователя:', error))
        .finally(() => evt.submitter.textContent = originalButtonText);
}


addCardButton.addEventListener('click', () => openPopup(popupAddCard));
popupAddCardCloseButton.addEventListener('click', () => closePopup(popupAddCard));


popupAddCardForm.addEventListener('submit', handleNewCardFormSubmit);

function handleNewCardFormSubmit(evt) {
    evt.preventDefault();

    const originalButtonText = evt.submitter.textContent;
    evt.submitter.textContent = 'Сохранение...';

    addCard(popupAddCardName.value, popupAddCardLink.value)
        .then((cardData) => {
            const newCard = createCard(
                cardData,
                profileId,
                deleteCard,
                onOpenImage
            );

            placesList.prepend(newCard);
            closePopup(popupAddCard);
            popupAddCardForm.reset();

        })
        .catch((error) => console.error('Ошибка при добавлении карточки:', error))
        .finally(() => (evt.submitter.textContent = originalButtonText));

    clearValidation(popupAddCardForm, validationConfig);
}


function removeCardCallback(cardElement, cardData) {
    removeCard(cardData._id)
        .then(() => deleteCard(cardElement))
        .catch((error) => console.error('Ошибка при удалении карточки:', error));
}


profileAvatar.addEventListener('click', openEditAvatarPopup);

function openEditAvatarPopup() {
    openPopup(popupEditAvatar);
    clearValidation(popupEditAvatarForm, validationConfig);
}


popupEditAvatarForm.addEventListener('submit', handleAvatarFormSubmit);

function handleAvatarFormSubmit(evt) {
    evt.preventDefault();
    const originalButtonText = evt.submitter.textContent;

    evt.submitter.textContent = 'Сохранение...';

    updateAvatar(avatarLink.value)
        .then((profileData) => {
            profileAvatar.style.backgroundImage = `url(${profileData.avatar})`;
            closePopup(popupEditAvatar);
        })
        .catch((error) => console.error('Ошибка при обновлении аватара пользователя', error))
        .finally(() => evt.submitter.textContent = originalButtonText);
}

popupAvatarCloseButton.addEventListener('click', () => closePopup(popupEditAvatar));


function initializeProfile(profileData) {
    profileId = profileData._id;
    profileTitle.textContent = profileData.name;
    profileDescription.textContent = profileData.about;
    profileAvatar.style = `background-image: url(${profileData.avatar})`;
}

function initializeCards(cardsData) {
    cardsData.forEach((cardData) => {
        placesList.append(
            createCard(cardData, profileId, removeCardCallback, onOpenImage)
        );
    });
}

Promise.all([getProfileInfo(), getInitialCards()])
    .then(([profileData, cardsData]) => {
        initializeProfile(profileData);
        initializeCards(cardsData);
    })
    .catch(err => console.error('Произошла ошибка при загрузке данных профиля или списка карточек: ' + err));

function onOpenImage(link, name) {
    popupCardViewImage.src = link;
    popupCardViewImage.alt = name;
    popupCardViewCaption.textContent = name;

    openPopup(popupCardView);
}

popupCardViewCloseButton.addEventListener('click', () => closePopup(popupCardView));


enableValidation(validationConfig);

// initialCards.forEach((cardItem) =>
//   placesList.append(createCard(cardItem, openCard, changeLikeCard, deleteMyCard))
// );


// const avatarForm = document.querySelector('.popup__form[name="avatar"]'),
//

// // function handleProfileFormSubmit(evt) {
// //   evt.preventDefault();

// //   popupEditProfileButton.textContent = "Сохранение...";

// //   editProfile(profileNameInput.value, profileJobInput.value)
// //     .then((profileData) => {
// //       profileTitle.textContent = profileData.name;
// //       profileDescription.textContent = profileData.about;

// //       // profileTitle.textContent = profileNameInput.value;
// //       // profileDescription.textContent = profileJobInput.value;

// //       closePopup(popupEditProfile);
// //     })
// //     .catch((error) =>
// //       console.error("Ошибка при получении данных пользователя:", error)
// //     )

// //     .finally(() => (popupEditProfileButton.textContent = originalButtonText));

// //   clearValidation(profileForm, validationConfig);
// // }

// avatarForm.addEventListener("submit", handleAvatarFormSubmit);

// cardForm.addEventListener("submit", handleNewCardFormSubmit);

// profileAvatarEditButton.addEventListener("click", () => openEditAvatarPopup());


// clearValidation(avatarForm, validationConfig);
// clearValidation(profileForm, validationConfig);
// clearValidation(cardForm, validationConfig);

// // 

// // profileForm.addEventListener("submit", handleProfileFormSubmit);
// // cardForm.addEventListener("submit", handleNewCardFormSubmit);

// // profileEditButton.addEventListener("click", () => {
// //   profileNameInput.value = profileTitle.textContent;
// //   profileJobInput.value = profileDescription.textContent;

// //   openPopup(popupEditProfile);
// // });

// // profileAddButton.addEventListener("click", () => openPopup(popupNewCard));

// // popups.forEach((popup) => {
// //   popup.addEventListener("mousedown", closeByOverlay);
// // });
