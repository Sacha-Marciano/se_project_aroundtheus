class Section {
  constructor({ renderer }, containerSelector) {
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer;
  }

  renderItems(item) {
    return this._renderer(item);
  }

  addItem(element, method = "append") {
    this._container[method](element);
  }
}

export { Section };
