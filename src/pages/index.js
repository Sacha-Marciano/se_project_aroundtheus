//Import styles
import "./index.css";

//Import classes
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";

//Import settings
import {
  initialCards,
  validationSettings,
  userSettings,
} from "../utils/constants.js";

//Create UserInfo class
const userInfo = new UserInfo(userSettings);

//Selecting buttons
const buttonEdit = document.querySelector(".profile__button_type_edit");
const buttonAdd = document.querySelector(".profile__button_type_add");

//Create popups classes and set event listeners
const popupImage = new PopupWithImage("#image-modal-id");
const popupEdit = new PopupWithForm("#edit-modal-id", handleEditSumbit);
const popupAdd = new PopupWithForm("#add-modal-id", handleAddSumbit);

//Create card section class
const sectionCard = new Section(
  { items: initialCards, renderer: createCard },
  ".cards__list"
);

//Create validators
const formEditValidator = new FormValidator(validationSettings, popupEdit.form);
const formAddValidator = new FormValidator(validationSettings, popupAdd.form);

//Handlers for classes
function createCard(item) {
  const cardElement = new Card(item, "#card__template", handleImageClick);
  return cardElement.renderCard();
}

function handleImageClick(data) {
  popupImage.open(data);
}

function handleEditSumbit(obj) {
  userInfo.setUserInfo(obj);
  popupEdit.close();
  formEditValidator.disableButton();
}

function handleAddSumbit(obj) {
  sectionCard.addItem(createCard(obj));
  popupAdd.close();
  popupAdd.form.reset();
  formAddValidator.disableButton();
}

//Fills edit popup inputs according to profile info
function fillProfileInputs(obj) {
  popupEdit.form.querySelector("#name-id").value = obj.name;
  popupEdit.form.querySelector("#aboutMe-id").value = obj.description;
}

//On page load/refresh
sectionCard.renderItems();
formEditValidator.enableValidation();
formAddValidator.enableValidation();

//Set event Listeners
buttonEdit.addEventListener("click", () => {
  fillProfileInputs(userInfo.getUserInfo());
  popupEdit.open();
});
buttonAdd.addEventListener("click", () => popupAdd.open());
popupImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
