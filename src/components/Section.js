class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  addItem(element, method = "append") {
    this._container[method](this._renderer(element));
  }
}

export { Section };
