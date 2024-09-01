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

const buttonEdit = document.querySelector(".profile__button_type_edit");
const buttonClose = document.querySelector(".modal__button_type_close");
const modal = document.querySelector(".modal");

const profileFormElement = document.querySelector(".modal__container");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const nameInput = document.querySelector("[name='name']");
const descriptionInput = document.querySelector("[name='about me']");

const cardsList = document.querySelector(".cards__list");

const cardTemplate = document.querySelector("#card__template").content;

function openModal() {
  modal.classList.add("modal_opened");
}

function closeModal() {
  modal.classList.remove("modal_opened");
}

function setInputValue() {
  nameInput.value = `${profileName.textContent}`;
  descriptionInput.value = `${profileDescription.textContent}`;
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = `${nameInput.value}`;
  profileDescription.textContent = `${descriptionInput.value}`;
  closeModal();
  setInputValue();
}

function getCardElement(data) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
  const cardImageElement = cardElement.querySelector(".card__image");
  const cardNameElement = cardElement.querySelector(".card__name");
  cardImageElement.alt = data.name;
  cardImageElement.src = data.link;
  cardNameElement.textContent = data.name;
  return cardElement;
}

setInputValue();

buttonEdit.addEventListener("click", openModal);
buttonClose.addEventListener("click", closeModal);
profileFormElement.addEventListener("submit", handleProfileFormSubmit);

for (i = initialCards.length - 1; i >= 0; i--) {
  cardsList.prepend(getCardElement(initialCards[i]));
}
