const cohortId = "plus-cohort-2";
const authToken = "755b9008-e161-4a71-9b33-376d2b5a566b";
const baseUrl = "https://nomoreparties.co/v1/";
const authHeader = { authorization: authToken }
const headersWithContentType = {
    authorization: authToken,
    'Content-Type': 'application/json'
}
export function getUserInfo() {
    return fetch(
        `${baseUrl}${cohortId}/users/me`,
        {
            headers: authHeader
        }
    ).then(result => checkResponse(result));
}

export function getInitialCards() {
    return fetch(
        `${baseUrl}${cohortId}/cards`,
        {
            headers: authHeader
        }
    ).then(result => checkResponse(result));
}

export function saveProfileInfo(name, about) {
    return fetch(
        `${baseUrl}${cohortId}/users/me`,
        {
            method: 'PATCH',
            headers: headersWithContentType,
            body: JSON.stringify({
                name: name,
                about: about
            })
        }
    ).then(result => checkResponse(result));
}
export function saveCard(name, link) {
    return fetch(
        `${baseUrl}${cohortId}/cards`,
        {
            method: 'POST',
            headers: headersWithContentType,
            body: JSON.stringify({
                name: name,
                link: link
            })
        }
    ).then(result => checkResponse(result));
}

export function deleteCard(cardId){
    return  fetch(
        `${baseUrl}${cohortId}/cards/${cardId}`,
        {
            method: 'DELETE',
            headers: authHeader
        }
    ).then(result => checkResponse(result));
}
export function addOrDeleteLike(cardId, method) {
    return  fetch(
        `${baseUrl}${cohortId}/cards/likes/${cardId}`,
        {
            method: method,
            headers: authHeader
        }
    ).then(result => checkResponse(result));
}

export function updateAvatar(avatarLink) {
    return fetch(
        `${baseUrl}${cohortId}/users/me/avatar`,
        {
            method: 'PATCH',
            headers: headersWithContentType,
            body: JSON.stringify({
                avatar: avatarLink
            })
        }
    ).then(result => checkResponse(result));
}

function checkResponse(result) {
    if (!result.ok) {
        return Promise.reject(`Ошибка, статус: ${result.status}.`)
    } else {
        return result.json();
    }
}