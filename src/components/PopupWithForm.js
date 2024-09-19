import { Popup } from "./Popup.js";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    // pass handleAddform for add form and pass handleeditform for edit form
    super(popupSelector);
    this.form = this._popup.querySelector(".modal__container");
    this._handleFormSubmit = handleFormSubmit;
    this._inputs = this.form.querySelectorAll(".modal__input");
  }

  _getInputValues() {
    const inputValues = {};
    this._inputs.forEach((input) => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  setEventListeners() {
    this.form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
    super.setEventListeners();
  }
}

export { PopupWithForm };
