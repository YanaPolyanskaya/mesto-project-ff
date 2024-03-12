//функция открытия попапов

function openPopup(popupElement) {
  popupElement.classList.add("popup_is-opened");
  document.addEventListener("keydown", closeByEscape);
}

//функция закрытия попапов

function closePopup(popupElement) {
  popupElement.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", closeByEscape);
}

//функция закрытия попапов через escape

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");

    closePopup(openedPopup);
  }
}

//функция закрытия при нажатии на overlay

function closeByOverlay(evt) {
  if (evt.target.matches(".popup_is-opened, .popup__close")) {
    const openedPopup = document.querySelector(".popup_is-opened");

    closePopup(openedPopup);
  }
}

export { openPopup, closePopup, closeByOverlay };
