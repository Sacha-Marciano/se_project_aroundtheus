//Import styles
import "./index.css";

//Import classes, settings and API
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { UserInfo } from "../components/UserInfo.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { PopupDelete } from "../components/PopupDelete.js";
import { validationSettings, userSettings } from "../utils/constants.js";
import { Api } from "../utils/Api.js";

//Create API
const api = new Api({
  baseURL: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "a50cd7e6-b371-411e-bfcd-861efcd7c545",
    "Content-Type": "application/json",
  },
});

//Selecting elements
const buttonEdit = document.querySelector(".profile__button_type_edit");
const buttonAdd = document.querySelector(".profile__button_type_add");
const avatar = document.querySelector(".profile__image");
const avatarEdit = document.querySelector(".image__container");

//Create sectionCard class
const sectionCard = new Section({ renderer: createCard }, ".cards__list");

//Create UserInfo class
const userInfo = new UserInfo(userSettings);

//Create popups classes and set event listeners
const popupImage = new PopupWithImage("#image-modal-id");
const popupEdit = new PopupWithForm("#edit-modal-id", handleEditSumbit);
const popupAdd = new PopupWithForm("#add-modal-id", handleAddSumbit);
const popupAvatar = new PopupWithForm("#avatar-modal-id", handleAvatarSubmit);
const popupDelete = new PopupDelete("#delete-modal-id", handleDeleteSubmit);

//Create validators
const formEditValidator = new FormValidator(validationSettings, popupEdit.form);
const formAddValidator = new FormValidator(validationSettings, popupAdd.form);
const formAvatarValidator = new FormValidator(
  validationSettings,
  popupAvatar.form
);

//Handlers for classes
function createCard(item) {
  const cardElement = new Card(
    item,
    "#card__template",
    handleImageClick,
    handleDeleteClick,
    toggleServerLike
  );
  return cardElement.renderCard();
}

function handleImageClick(data) {
  popupImage.open(data);
}

function handleEditSumbit(obj) {
  popupEdit.renderLoading(true);
  userInfo.setUserInfo(obj);
  formEditValidator.disableButton();
  api.updateCurrentUser(
    JSON.stringify({
      name: obj.name,
      about: obj.about,
    })
  );
  popupEdit.renderLoading(false);
  popupEdit.close();
}

function handleAddSumbit(obj) {
  popupAdd.renderLoading(true);
  sectionCard.addItem(obj, "prepend");
  api.postCard(
    JSON.stringify({
      name: obj.name,
      link: obj.link,
    })
  );
  popupAdd.renderLoading(false);
  popupAdd.close();
  popupAdd.form.reset();
  formAddValidator.disableButton();
}

function handleDeleteClick(thisCard) {
  popupDelete.getCardInfo(thisCard);
  popupDelete.open();
}

function handleDeleteSubmit(thisCard) {
  api.deleteCard(thisCard._id);
  thisCard.deleteCard();
  popupDelete.close();
}

function handleAvatarSubmit(obj) {
  popupAvatar.renderLoading(false);
  avatar.src = obj.link;
  api.updateCurrentAvatar(
    JSON.stringify({
      avatar: obj.link,
    })
  );
  popupAvatar.renderLoading(false);
  popupAvatar.close();
  popupAvatar.form.reset();
}

//Check state of isLiked in the server and toggle like state in the API
function toggleServerLike(thisCard) {
  if (!thisCard._isLiked) {
    api.putLike(thisCard._id);
  } else {
    api.deleteLike(thisCard._id);
  }
  thisCard._isLiked = !thisCard._isLiked;
}

//Fills edit popup inputs according to profile info
function fillProfileInputs(obj) {
  popupEdit.form.querySelector("#name-id").value = obj.name;
  popupEdit.form.querySelector("#aboutMe-id").value = obj.about;
}

//               LOADING/REFRESH                   //

//Check that both request are fulfilled, then add info and cards from API to display

api.checkPromises().then(([userProfile, userCards]) => {
  userInfo.setUserInfo(userProfile);
  avatar.src = userProfile.avatar;

  userCards.forEach((item) => {
    sectionCard.addItem(item);
  });
});

//Enable validation
formEditValidator.enableValidation();
formAddValidator.enableValidation();
formAvatarValidator.enableValidation();

//Set event listeners
buttonEdit.addEventListener("click", () => {
  fillProfileInputs(userInfo.getUserInfo());
  popupEdit.open();
});
avatarEdit.addEventListener("click", () => {
  popupAvatar.open();
});
buttonAdd.addEventListener("click", () => popupAdd.open());
popupImage.setEventListeners();
popupEdit.setEventListeners();
popupAdd.setEventListeners();
popupDelete.setEventListeners();
popupAvatar.setEventListeners();
