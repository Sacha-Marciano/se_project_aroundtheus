import { Popup } from "./Popup.js";

class PopupDelete extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this.form = this._popup.querySelector(".modal__container");
    this._handleFormSubmit = handleFormSubmit;
  }

  getCardInfo(card) {
    this._card = card;
  }

  setEventListeners() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._card);
    });
    super.setEventListeners();
  }
}

export { PopupDelete };
