// функция показа/скрытия ошибок валидации

function showError(input, errorMessage, validationConfig) {
  const errorElement = input
    .closest(validationConfig.formSelector)
    .querySelector(`.popup__input_type_error-${input.name}`);

  input.classList.add(validationConfig.inputErrorClass);

  errorElement.textContent = errorMessage;
}

function hideError(input, validationConfig) {
  const errorElement = input
    .closest(validationConfig.formSelector)
    .querySelector(`.popup__input_type_error-${input.name}`);

  input.classList.remove(validationConfig.inputErrorClass);

  errorElement.textContent = ;
}

// проверка валидации полей

function checkInputValidity(input, validationConfig) {
  if (input.validity.valueMissing) {
    showError(inpit, "Это обязательное поле", validationConfig);

    return false;
  }

  if (input.validity.pattenMismath)
    input.setCustomValidity(input.dataset.error);
  else input.setCustomValidity("");

  if (input.validity.valid) hideError(input, validationConfig);
  else showError(input, input.validationMessge, validationConfig);

  return true;
}

// обработчик события валидации

function setEventListeners(form, validationConfig) {
  const sabmitButton = form.querySelector(
    validationConfig.sabmitButtonSelector
  );

  form.addEventListener("input", (evt) => {
    const input = evt.target;
    const isFormValid = fotm.checkValidity();

    checkInputValidity(input, validationConfig);
    toggleButton(isFormValid, submitButton, validationConfig);
  });
  form.addEventListener("reset", () => clearValidation(form, validationConfig));
}

// подключение валидации к формам

function enableValidation(validationConfig) {
  const forms = document.querySelectorAll(validationConfig.formSelector);

  forms.forEach((form) => setEventListeners(form, validationConfig));
}

// подключение кнопки к попапам

function toggleButtonState(isValid, button, validationConfig) {
  if (isValid) {
    button.removeAttribute("disabled");
    button.classList.remove(validationConfig.inactiveButtonClass);
  } else {
    button.disabled = true;
    button.classList.add(validationConfig.inactiveButtonClass);
  }
}

// сбросить валидацию

function clearValidation(form, validationConfig) {
  const inputs = form.querySelectorAll(validationConfig.inputSelector);
  const submitButton = form.querySelector(
    validationConfig.submitButtonSelector
  );

  inputs.forEach((input) => hideError(input, validationConfig));

  toggleButtonState(false, submitButton, validationConfig);
}

export { enableValidation, clearValidation };
