const cohortId = "plus-cohort-2";
const authToken = "755b9008-e161-4a71-9b33-376d2b5a566b";

export function getUserInfo() {
    return fetch(
        `https://nomoreparties.co/v1/${cohortId}/users/me`,
        {
            headers: {
                authorization: authToken
            }
        }
    ).then(result => {
        if (result.ok) {
            return result.json();
        }
        return Promise.reject(`На запрос получения информации о пользователе 
        вернулся ответ со статусом ${result.status}.`)
    });
}

export function getInitialCards() {
    return fetch(
        `https://nomoreparties.co/v1/${cohortId}/cards`,
        {
            headers: {
                authorization: authToken
            }
        }
    ).then(result => {
        if (result.ok) {
            return result.json();
        }
        return Promise.reject(`На запрос получения карточек вернулся ответ со статусом ${result.status}.`)
    });
}

export function saveProfileInfo(name, about) {
    return fetch(
        `https://nomoreparties.co/v1/${cohortId}/users/me`,
        {
            method: 'PATCH',
            headers: {
                authorization: authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                about: about
            })
        }
    ).then(result => {
        if (result.ok) {
            return result.json();
        }
        return Promise.reject(`На запрос сохранения информации о пользователе 
        вернулся ответ со статусом ${result.status}.`)
    });
}
export function saveCard(name, link) {
    return fetch(
        `https://nomoreparties.co/v1/${cohortId}/cards`,
        {
            method: 'POST',
            headers: {
                authorization: authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        }
    ).then(result => {
        if (result.ok) {
            return result.json();
        }
        return Promise.reject(`На запрос сохранения информации о пользователе 
        вернулся ответ со статусом ${result.status}.`)
    });
}

export function deleteCard(cardId){
    return  fetch(
        `https://nomoreparties.co/v1/${cohortId}/cards/${cardId}`,
        {
            method: 'DELETE',
            headers: {
                authorization: authToken
            }
        }
    ).then(result => {
        if (!result.ok) {
            return Promise.reject(`На запрос сохранения информации о пользователе 
        вернулся ответ со статусом ${result.status}.`)
        }
    });
}
export function addOrDeleteLike(cardId, method) {
    return  fetch(
        `https://nomoreparties.co/v1/${cohortId}/cards/likes/${cardId}`,
        {
            method: method,
            headers: {
                authorization: authToken
            }
        }
    ).then(result => {
        if (result.ok) {
            return result.json();
        }
        return Promise.reject(`На запрос сохранения информации о пользователе 
        вернулся ответ со статусом ${result.status}.`)
    });
}

export function updateAvatar(avatarLink) {
    return fetch(
        `https://nomoreparties.co/v1/${cohortId}/users/me/avatar`,
        {
            method: 'PATCH',
            headers: {
                authorization: authToken,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarLink
            })
        }
    ).then(result => {
        if (!result.ok) {
            return Promise.reject(`На запрос сохранения аватарки вернулся ответ со статусом ${result.status}.`)
        }
    });
}

