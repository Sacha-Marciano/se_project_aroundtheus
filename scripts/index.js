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
const buttonCloseEdit = document.querySelector("#close-edit-id");
const modalEdit = document.querySelector("#edit-modal-id");

const profileEditForm = document.querySelector("#edit-container-id");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector("[name='name']");
const descriptionInput = document.querySelector("[name='about me']");

// Setting "add image" variables
const buttonAdd = document.querySelector(".profile__button_type_add");
const modalAdd = document.querySelector("#add-modal-id");
const buttonCloseAdd = document.querySelector("#close-add-id");

const profileAddForm = document.querySelector("#add-container-id");

const placeInput = document.querySelector("[name='place']");
const imageLinkInput = document.querySelector("[name='image link']");

//Setting image modal variables
const imageModal = document.querySelector("#image-modal-id");
const buttonCloseImage = document.querySelector("#close-image-id");

const modalPicture = document.querySelector(".modal__image");
const modalTitle = document.querySelector(".modal__image-title");

//Setting card elements
const cardsList = document.querySelector(".cards__list");
const cardTemplate = document.querySelector("#card__template").content;

//Open and close modals
function openEditModal() {
  modalEdit.classList.add("modal_opened");
}

function closeEditModal() {
  modalEdit.classList.remove("modal_opened");
}

function openAddModal() {
  modalAdd.classList.add("modal_opened");
}

function closeAddModal() {
  modalAdd.classList.remove("modal_opened");
}

function openImageModal() {
  imageModal.classList.add("modal_opened");
}

function closeImageModal() {
  imageModal.classList.remove("modal_opened");
}

//Inputs function
function setInputValue() {
  nameInput.value = `${profileName.textContent}`;
  descriptionInput.value = `${profileDescription.textContent}`;
  placeInput.value = "";
  imageLinkInput.value = "";
}

//Submit buttons functions
function handleEditFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = `${nameInput.value}`;
  profileDescription.textContent = `${descriptionInput.value}`;
  closeEditModal();
  setInputValue();
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  initialCards.push({ name: placeInput.value, link: imageLinkInput.value });
  const newCard = initialCards[initialCards.length - 1];
  console.log(newCard);
  cardsList.prepend(getCardElement(newCard));

  closeAddModal();
  setInputValue();
}

//Using the template
function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardNameElement = cardElement.querySelector(".card__name");
  cardImageElement.alt = data.name;
  cardImageElement.src = data.link;
  cardNameElement.textContent = data.name;
  return cardElement;
}

function handleCardClicked(evt) {
  const target = evt.target;
  if (target.classList.contains("card__like-button")) {
    target.classList.toggle("card__like-button_liked");
  } else if (target.classList.contains("card__delete-button")) {
    const deletedCard = target.parentElement;
    deletedCard.remove();
  } else if (target.classList.contains("card__image")) {
    getImage(target.src, target.alt);
    openImageModal();
  }
}

function getImage(src, alt) {
  console.log(src);
  console.log(alt);
  modalPicture.setAttribute("src", `${src}`);
  modalPicture.setAttribute("alt", `${alt}`);
  modalTitle.textContent = alt;
}

//When starting or refreshing
initialCards.forEach(function (object) {
  cardsList.append(getCardElement(object));
});
setInputValue();

//Events listeners
buttonEdit.addEventListener("click", openEditModal);
buttonCloseEdit.addEventListener("click", closeEditModal);
profileEditForm.addEventListener("submit", handleEditFormSubmit);

buttonAdd.addEventListener("click", openAddModal);
buttonCloseAdd.addEventListener("click", closeAddModal);
profileAddForm.addEventListener("submit", handleAddFormSubmit);

cardsList.addEventListener("click", handleCardClicked);

buttonCloseImage.addEventListener("click", closeImageModal);
