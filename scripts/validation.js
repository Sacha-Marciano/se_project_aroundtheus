const enableValidation = ({
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,
}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((someForm) => {
    someForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(
      someForm,
      inputSelector,
      submitButtonSelector,
      inactiveButtonClass,
      inputErrorClass,
      errorClass
    );
  });
};

const setEventListeners = (
  someForm,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass
) => {
  const inputList = Array.from(someForm.querySelectorAll(inputSelector));
  const buttonSubmit = someForm.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonSubmit, inactiveButtonClass);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(someForm, inputElement, inputErrorClass, errorClass);
      toggleButtonState(inputList, buttonSubmit, inactiveButtonClass);
    });
  });
};

const toggleButtonState = (inputList, buttonSubmit, inactiveButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonSubmit.classList.add(inactiveButtonClass);
    buttonSubmit.disabled = true;
  } else {
    buttonSubmit.classList.remove(inactiveButtonClass);
    buttonSubmit.disabled = false;
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  });
};

const checkInputValidity = (
  someForm,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  if (!inputElement.validity.valid) {
    showInputError(
      someForm,
      inputElement,
      inputElement.validationMessage,
      inputErrorClass,
      errorClass
    );
  } else {
    hideInputError(someForm, inputElement, inputErrorClass, errorClass);
  }
};

const showInputError = (
  someForm,
  inputElement,
  errorMessage,
  inputErrorClass,
  errorClass
) => {
  const errorElement = someForm.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};

const hideInputError = (
  someForm,
  inputElement,
  inputErrorClass,
  errorClass
) => {
  const errorElement = someForm.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

enableValidation({
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button_type_submit",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error",
});
