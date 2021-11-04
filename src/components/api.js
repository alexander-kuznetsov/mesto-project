class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(
            `${this._baseUrl}/users/me`,
            {
                headers: {
                    authorization: this._headers.authorization
                }
            }
        ).then(result => this._checkResponse(result));
    }

    getInitialCards() {
        return fetch(
            `${this._baseUrl}/cards`,
            {
                headers: {
                    authorization: this._headers.authorization
                }
            }
        ).then(result => this._checkResponse(result));
    }

    saveProfileInfo(name, about) {
        return fetch(
            `${this._baseUrl}/users/me`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    about: about
                })
            }
        ).then(result => this._checkResponse(result));
    }

    saveCard(name, link) {
        return fetch(
            `${this._baseUrl}/cards`,
            {
                method: 'POST',
                headers: this._headers,
                body: JSON.stringify({
                    name: name,
                    link: link
                })
            }
        ).then(result => this._checkResponse(result));
    }


    deleteCard(cardId){
        return  fetch(
            `${this._baseUrl}/cards/${cardId}`,
            {
                method: 'DELETE',
                headers: {
                    authorization: this._headers.authorization
                }
            }
        ).then(result => this._checkResponse(result));
    }

    addOrDeleteLike(cardId, method) {
        return  fetch(
            `${this._baseUrl}/cards/likes/${cardId}`,
            {
                method: method,
                headers: {
                    authorization: this._headers.authorization
                }
            }
        ).then(result => this._checkResponse(result));
    }

    updateAvatar(avatarLink) {
        return fetch(
            `${this._baseUrl}/users/me/avatar`,
            {
                method: 'PATCH',
                headers: this._headers,
                body: JSON.stringify({
                    avatar: avatarLink
                })
            }
        ).then(result => this._checkResponse(result));
    }
    _checkResponse(result) {
        if (!result.ok) {
            return Promise.reject(`Ошибка, статус: ${result.status}.`)
        } else {
            return result.json();
        }
    }
}

const options = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-2",
    headers: {
        authorization: "755b9008-e161-4a71-9b33-376d2b5a566b",
        "Content-Type": "application/json"
    }
}

export const api = new Api(options);
export const apiFunctions = {
    addOrDeleteLike: (cardId, method) => { return api.addOrDeleteLike(cardId, method) },
    deleteCard: (cardId) => { return api.deleteCard(cardId)},
    updateAvatar: (avatarLink) => { return api.updateAvatar(avatarLink)},
    saveCard: (name, link) => { return api.saveCard(name, link)},
    saveProfileInfo: (name, about) => { return api.saveProfileInfo(name, about)},
    getInitialCards: _ => { return api.getInitialCards()},
    getUserInfo: _ => { return api.getUserInfo()},
}