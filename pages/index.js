//imports
import { FormValidator } from "../components/FormValidator.js";
import { Card, initialCards } from "../components/Card.js";

// Setting "edit profile" variables
const buttonEdit = document.querySelector(".profile__button_type_edit");
const modalEditElement = document.querySelector("#edit-modal-id");

const profileEditForm = document.forms["edit-container"];

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector("[name='name']");
const descriptionInput = document.querySelector("[name='about me']");

// Setting "add image" variables
const buttonAdd = document.querySelector(".profile__button_type_add");
const modalAddElement = document.querySelector("#add-modal-id");

const profileAddForm = document.forms["add-container"];

const placeNameInput = document.querySelector("[name='place']");
const imageLinkInput = document.querySelector("[name='image link']");

//Setting image modal variables
const modalImage = document.querySelector("#image-modal-id");

const modalSelectedImage = document.querySelector(".modal__image");
const modalTitle = document.querySelector(".modal__image-title");

//Selecting all close buttons
const closeButtons = document.querySelectorAll(".modal__button_type_close");

//Selecting cards list
const cardsList = document.querySelector(".cards__list");

//Setting forms validation class
const settings = {
  formSelector: ".modal__container",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button_type_submit",
  inactiveButtonClass: "modal__button_inactive",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__input-error",
};

//Setting validators
const formEditValidator = new FormValidator(settings, profileEditForm);
const formAddValidator = new FormValidator(settings, profileAddForm);

//Open and close modals
function openPopup(popup) {
  popup.classList.add("modal_opened");
  popup.addEventListener("click", closeIfClick);
  window.addEventListener("keyup", closeIfEsc);
}

function closePopup(popup) {
  popup.classList.remove("modal_opened");
  popup.removeEventListener("click", closeIfClick);
  window.removeEventListener("keyup", closeIfEsc);
}

function closeIfClick(evt) {
  const target = evt.target;
  if (target.classList.contains("modal_opened")) {
    closePopup(target);
  }
}

function closeIfEsc(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".modal_opened");
    closePopup(popup);
  }
}

//Inputs function
function fillProfileInputs() {
  nameInput.value = `${profileName.textContent}`;
  descriptionInput.value = `${profileDescription.textContent}`;
  formEditValidator.disableButton();
}

//Submit buttons functions
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = `${nameInput.value}`;
  profileDescription.textContent = `${descriptionInput.value}`;
  closePopup(modalEditElement);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const data = { name: placeNameInput.value, link: imageLinkInput.value };
  renderCard(data, "prepend");
  evt.target.reset();
  closePopup(modalAddElement);
  formAddValidator.disableButton();
}

//Render initial and new cards
function renderCard(item, method = "append") {
  const cardElement = createCard(item);
  cardsList[method](cardElement);
}

//Create card with class
function createCard(item) {
  const cardElement = new Card(item, "#card__template", handleImageClick);
  return cardElement.renderCard();
}

//Handler for image event listener
function handleImageClick(object) {
  getImage(object._link, object._name);
  openPopup(modalImage);
}

function getImage(src, alt) {
  modalSelectedImage.setAttribute("src", `${src}`);
  modalSelectedImage.setAttribute("alt", `${alt}`);
  modalTitle.textContent = alt;
}

//Events listeners
buttonEdit.addEventListener("click", () => {
  fillProfileInputs();
  openPopup(modalEditElement);
});
profileEditForm.addEventListener("submit", handleEditFormSubmit);

buttonAdd.addEventListener("click", () => openPopup(modalAddElement));
profileAddForm.addEventListener("submit", handleAddFormSubmit);

closeButtons.forEach((item) => {
  const popup = item.closest(".modal");
  item.addEventListener("click", () => closePopup(popup));
});

//When starting or refreshing
initialCards.forEach((item) => renderCard(item));

formEditValidator.enableValidation();
formAddValidator.enableValidation();
