class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getCurrentUser() {
    return this._request(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: this._headers,
    });
  }

  updateCurrentUser(body) {
    return this._request(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: body,
    });
  }

  updateCurrentAvatar(body) {
    return this._request(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: body,
    });
  }

  getAllCards() {
    return this._request(`${this._baseURL}/cards`, {
      method: "GET",
      headers: this._headers,
    });
  }

  postCard(body) {
    return this._request(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: body,
    });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  putLike(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._checkResponse(res);
    });
  }

  _request(url, options) {
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  getInitialData() {
    return Promise.all([this.getCurrentUser(), this.getAllCards()]);
  }
}

export { Api };
