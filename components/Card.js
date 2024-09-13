class Card {
  constructor(data, cardSelector, handleImageClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = cardSelector;
    this._handleImageClick = handleImageClick;
    this._newCard = document
      .querySelector(this._template)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  renderCard() {
    this._cardImageElement = this._newCard.querySelector(".card__image");
    this._cardNameElement = this._newCard.querySelector(".card__name");
    this._cardLikeElement = this._newCard.querySelector(".card__like-button");
    this._cardTrashElement = this._newCard.querySelector(
      ".card__delete-button"
    );

    this._cardImageElement.alt = this._name;
    this._cardImageElement.src = this._link;
    this._cardNameElement.textContent = this._name;

    this._setEventListeners();

    return this._newCard;
  }

  _setEventListeners() {
    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick(this);
    });

    this._cardLikeElement.addEventListener("click", (evt) => {
      evt.stopPropagation();
      this._toggleLike();
    });

    this._cardTrashElement.addEventListener("click", (evt) => {
      evt.stopPropagation();
      this._deleteCard();
    });
  }

  _toggleLike() {
    this._cardLikeElement.classList.toggle("card__like-button_liked");
  }

  _deleteCard() {
    this._newCard.remove();
  }
}

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

export { Card, initialCards };
