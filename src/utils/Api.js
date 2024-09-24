class Api {
  constructor({ baseURL, headers }) {
    this._baseURL = baseURL;
    this._headers = headers;
  }

  getCurrentUser() {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateCurrentUser(body) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: body,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  updateCurrentAvatar(body) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: body,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getAllCards() {
    return fetch(`${this._baseURL}/cards`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  postCard(body) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      headers: this._headers,
      body: body,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteCard(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  putLike(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  deleteLike(cardId) {
    return fetch(`${this._baseURL}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        return this._checkResponse(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  checkPromises() {
    return Promise.all([this.getCurrentUser(), this.getAllCards()]);
  }
}

export { Api };
