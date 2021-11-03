// const authToken = "755b9008-e161-4a71-9b33-376d2b5a566b";
// const baseUrl = "https://nomoreparties.co/v1/";
// const authHeader = { authorization: authToken }
// const headersWithContentType = {
//     authorization: authToken,
//     'Content-Type': 'application/json'
// }


function checkResponse(result) {
    if (!result.ok) {
        return Promise.reject(`Ошибка, статус: ${result.status}.`)
    } else {
        return result.json();
    }
}

class Api {
    constructor(options) {
        this._baseUrl = options.this._baseUrl;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(
            `${this._baseUrl}/users/me`,
            {
                headers: this._headers.authorization,
            }
        ).then(result => checkResponse(result));
    }

    getInitialCards() {
        return fetch(
            `${this._baseUrl}/cards`,
            {
                headers: this._headers.authorization,
            }
        ).then(result => checkResponse(result));
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
        ).then(result => checkResponse(result));
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
        ).then(result => checkResponse(result));
    }


    deleteCard(cardId){
        return  fetch(
            `${this._baseUrl}/cards/${cardId}`,
            {
                method: 'DELETE',
                headers: this._headers.authorization,
            }
        ).then(result => checkResponse(result));
    }

    addOrDeleteLike(cardId, method) {
        return  fetch(
            `${this._baseUrl}/cards/likes/${cardId}`,
            {
                method: method,
                headers: this._headers.authorization
            }
        ).then(result => checkResponse(result));
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
        ).then(result => checkResponse(result));
    }
}

const options = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-2",
    headers: {
        "authorization": "755b9008-e161-4a71-9b33-376d2b5a566b",
        "Content-Type":"application/json"
    }
}

export const api = new Api(options);
