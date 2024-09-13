//imports
import { FormValidator } from "../components/FormValidator.js";
import { Card, initialCards } from "../components/Card.js";

// Setting "edit profile" variables
const buttonEdit = document.querySelector(".profile__button_type_edit");
const modalEdit = document.querySelector("#edit-modal-id");

const profileEditForm = document.querySelector("#edit-container-id");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector("[name='name']");
const descriptionInput = document.querySelector("[name='about me']");

// Setting "add image" variables
const buttonAdd = document.querySelector(".profile__button_type_add");
const modalAdd = document.querySelector("#add-modal-id");

const profileAddForm = document.querySelector("#add-container-id");

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

const formEdit = new FormValidator(settings, modalEdit);
const formAdd = new FormValidator(settings, modalAdd);

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
}

//Submit buttons functions
function handleEditFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = `${nameInput.value}`;
  profileDescription.textContent = `${descriptionInput.value}`;
  closePopup(modalEdit);
  fillProfileInputs();
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const data = { name: placeNameInput.value, link: imageLinkInput.value };
  const newCard = new Card(data, "#card__template", handleImageClick);
  cardsList.prepend(newCard.renderCard());
  evt.target.reset();
  closePopup(modalAdd);
}

function handleImageClick(object) {
  getImage(object._link, object._name);
  openPopup(modalImage);
}

// Get image source for image modal
function getImage(src, alt) {
  modalSelectedImage.setAttribute("src", `${src}`);
  modalSelectedImage.setAttribute("alt", `${alt}`);
  modalTitle.textContent = alt;
}

//Events listeners
buttonEdit.addEventListener("click", () => {
  fillProfileInputs();
  formEdit.resetButton();
  formEdit.enableValidation();
  openPopup(modalEdit);
});
profileEditForm.addEventListener("submit", handleEditFormSubmit);

buttonAdd.addEventListener("click", () => {
  formAdd.resetButton();
  formAdd.enableValidation();
  openPopup(modalAdd);
});
profileAddForm.addEventListener("submit", handleAddFormSubmit);

closeButtons.forEach((item) => {
  const popup = item.closest(".modal");
  item.addEventListener("click", () => closePopup(popup));
});

//When starting or refreshing
initialCards.forEach((item) => {
  const card = new Card(item, "#card__template", handleImageClick);
  cardsList.append(card.renderCard());
});

//Exports
export { handleImageClick, modalEdit, modalAdd };
