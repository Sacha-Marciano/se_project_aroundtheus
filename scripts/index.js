const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },

  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },

  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },

  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },

  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },

  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

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

//Setting cards variables
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card__template").content;

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
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();
  const newCard = { name: placeNameInput.value, link: imageLinkInput.value };
  cardsList.prepend(getCardElement(newCard));
  evt.target.reset();
  closePopup(modalAdd);
}

//Using the template
function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardNameElement = cardElement.querySelector(".card__name");
  const cardLikeElement = cardElement.querySelector(".card__like-button");
  const cardTrashElement = cardElement.querySelector(".card__delete-button");
  cardImageElement.alt = data.name;
  cardImageElement.src = data.link;
  cardNameElement.textContent = data.name;
  cardLikeElement.addEventListener("click", toggleLike);
  cardTrashElement.addEventListener("click", deleteCard);
  cardImageElement.addEventListener("click", growImage);

  return cardElement;
}

function toggleLike(evt) {
  const target = evt.target;
  target.classList.toggle("card__like-button_liked");
}

function deleteCard(evt) {
  const deletedCard = evt.target.parentElement;
  deletedCard.remove();
}

function growImage(evt) {
  const target = evt.target;
  getImage(target.src, target.alt);
  openPopup(modalImage);
}

// Get image source for image modal
function getImage(src, alt) {
  modalSelectedImage.setAttribute("src", `${src}`);
  modalSelectedImage.setAttribute("alt", `${alt}`);
  modalTitle.textContent = alt;
}

//When starting or refreshing
initialCards.forEach(function (object) {
  cardsList.append(getCardElement(object));
});

//Events listeners
buttonEdit.addEventListener("click", () => {
  openPopup(modalEdit);
  fillProfileInputs();
});
profileEditForm.addEventListener("submit", handleEditFormSubmit);

buttonAdd.addEventListener("click", () => openPopup(modalAdd));
profileAddForm.addEventListener("submit", handleAddFormSubmit);

closeButtons.forEach((item) => {
  const popup = item.closest(".modal");
  item.addEventListener("click", () => closePopup(popup));
});
