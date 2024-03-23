const showInputError = (formElement, inputElement, errorMessage, validateConfiguration) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validateConfiguration.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validateConfiguration.errorClass);
}

const hideInputError = (formElement, inputElement, validateConfiguration) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validateConfiguration.inputErrorClass);
  errorElement.classList.remove(validateConfiguration.errorClass);
  errorElement.textContent = '';
}

const isValid = (formElement, inputElement, validateConfiguration) => {
  inputElement.setCustomValidity(inputElement.validity.patternMismatch ? inputElement.dataset.errorMessage : '');

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validateConfiguration);
    return;
  }

  hideInputError(formElement, inputElement, validateConfiguration);
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
};

const toggleButtonState = (inputList, buttonElement, validateConfiguration) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validateConfiguration.inactiveButtonClass);
    return;
  }

  buttonElement.disabled = false;
  buttonElement.classList.remove(validateConfiguration.inactiveButtonClass);
};

const setEventListeners = (formElement, validateConfiguration) => {
  const inputList = Array.from(formElement.querySelectorAll(validateConfiguration.inputSelector));
  const buttonElement = formElement.querySelector(validateConfiguration.submitButtonSelector);

  toggleButtonState(inputList, buttonElement, validateConfiguration);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      isValid(formElement, inputElement, validateConfiguration);
      toggleButtonState(inputList, buttonElement, validateConfiguration);
    });
  });
};

export const enableValidation = validateConfiguration => {
  const formList = Array.from(document.querySelectorAll(validateConfiguration.formSelector));

  formList.forEach((formElement) => {
    setEventListeners(formElement, validateConfiguration);
  });
};

export const clearValidation = (formElement, validateConfiguration) => {
  const inputList = Array.from(formElement.querySelectorAll(validateConfiguration.inputSelector));
  const buttonElement = formElement.querySelector(validateConfiguration.submitButtonSelector);

  inputList.forEach((inputElement) => hideInputError(formElement, inputElement, validateConfiguration));
  toggleButtonState(inputList, buttonElement, validateConfiguration);
}