// функция показа/скрытия ошибок валидации

const showError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
};

const hideError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = "";
};

// проверка валидации полей

const isValid = (formElement, inputElement, validationConfig) => {
  inputElement.setCustomValidity(
    inputElement.validity.patternMismatch
      ? inputElement.dataset.errorMessage
      : ""
  );
  if (!inputElement.validity.valid) {
    showError(
      formElement,
      inputElement,
      inputElement.validationMessge,
      validationConfig
    );

    return;
  }
  hideError(formElement, inputElement, validationConfig);
};

const invalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// подключение кнопки к попапам

const toggleButtonState = (inputSelector, sabmitButton, validationConfig) => {
  if (invalidInput(inputSelector)) {
    sabmitButton.disabled = true;
    sabmitButton.classList.add(validationConfig.inactiveButtonClass);
    return;
  }
  sabmitButton.disabled = false;
  sabmitButton.classList.remove(validationConfig.inactiveButtonClass);
};

// обработчик события валидации

const setEventListeners = (formElement, validationConfig) => {
  const inputSelector = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const sabmitButton = formElement.querySelector(
    validationConfig.sabmitButtonSelect
  );

  toggleButtonState(inputSelector, sabmitButton, validationConfig);
  inputSelector.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputSelector, sabmitButton, validationConfig);
    });
  });
};

// подключение валидации к формам

const enableValidation = (validationConfig) => {
  const forms = Array.from(
    document.querySelectorAll(validationConfig.formSelector)
  );

  forms.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

// сбросить валидацию

const clearValidation = (formElement, validationConfig) => {
  const inputs = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  const submitButton = formElement.querySelector(
    validationConfig.submitButtonSelector
  );

  inputs.forEach((inputElement) =>
    hideError(formElement, formElement, validationConfig)
  );

  toggleButtonState(inputs, submitButton, validationConfig);
};

export { enableValidation, clearValidation };
