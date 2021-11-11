import './index.css';

import {Card} from "../components/Card";
import {FormValidator} from "../components/FormValidator";
import {PopupWithImage} from "../components/PopupWithImage";
import {Section} from "../components/Section";
import {Api} from "../components/Api";
import {UserInfo} from "../components/UserInfo";
import {PopupWithForm} from "../components/PopupWithForm";


const profilePopupElem = document.querySelector('.popup_type_profile');
const cardPopupElem = document.querySelector('.popup_type_card');
const avatarPopupElem = document.querySelector('.popup_type_avatar');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const avatarImage = document.querySelector('.profile__image');
const avatarOverlay = document.querySelector('.profile__image-overlay');

const inputNameElem = profilePopupElem.querySelector('[name="firstFormInput"]');
const inputJobElem = profilePopupElem.querySelector('[name="secondFormInput"]');

const editButton = document.querySelector('.button__edit');
const addButton = document.querySelector('.button__add');
const placesElem = document.querySelector('.places');
let userId;

const options = {
    baseUrl: "https://nomoreparties.co/v1/plus-cohort-2",
    headers: {
        authorization: "755b9008-e161-4a71-9b33-376d2b5a566b",
        "Content-Type": "application/json"
    }
}
const api = new Api(options);

const user = new UserInfo(
    ".profile__title",
    ".profile__subtitle",
    ".profile__image",
    {
        getUserInfo: _ => { return api.getUserInfo();},
        updateAvatar: (avatarLink) => { return api.updateAvatar(avatarLink);},
        saveUserInfo: (name, about) => { return api.saveUserInfo(name, about);}
    }
);

/*-------------------------------Validation-----------------------------------*/
const formValidationSetting = {
    formInputSelector: ".popup__input",
    submitButtonSelector: ".button__save",
    inactiveButtonClass: "button_state_inactive",
    inputErrorClass: "popup__input_type_error"
}
const profileFormValidator = new FormValidator(formValidationSetting, profilePopupElem);
const cardFormValidator = new FormValidator(formValidationSetting, cardPopupElem);
const avatarFormValidator = new FormValidator(formValidationSetting, avatarPopupElem);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

/*-------------------------------Rendering-----------------------------------*/
const cardFunctions = {
    addOrDeleteLike: (cardId, method) => { return api.addOrDeleteLike(cardId, method) },
    deleteCard: (cardId) => { return api.deleteCard(cardId)},
    handleCardClick: (link, name) => {
        const popupWithImage = new PopupWithImage('.popup_type_image', link, name);
        popupWithImage.setEventListeners();
        popupWithImage.open();
    }
}

Promise.all([user.getUserInfo(), api.getInitialCards()])
    .then(resultArray => {
        const userInfo = resultArray[0];
        profileTitle.textContent = userInfo.name;
        profileSubtitle.textContent = userInfo.about;
        avatarImage.src = userInfo.avatar
        userId = userInfo._id;

        const cardsArray = resultArray[1];

        const cards = new Section(
            {
                items: Array.from(cardsArray),
                renderer: (cardInfo) => {
                    const card = new Card(cardInfo, userId,'#place-card', cardFunctions);
                    return card.generate();
                }
            },
            '.places'
        );
        cards.rendererItems();
        }
    ).catch(err => console.log(err));

/*-------------------------------Popups-----------------------------------*/
const apiFunctions = {
    addOrDeleteLike: (cardId, method) => { return api.addOrDeleteLike(cardId, method);},
    deleteCard: (cardId) => { return api.deleteCard(cardId);},
    saveCard: (name, link) => { return api.saveCard(name, link);},
    getInitialCards: _ => { return api.getInitialCards();}
}

const cardPopup = new PopupWithForm(
    '.popup_type_card',
    (evt, inputValuesArray) => {
        evt.preventDefault();
        const firstInputValue = inputValuesArray[0];
        const secondInputValue = inputValuesArray[1];
        cardPopup.loadingButton(true);
        api.saveCard(firstInputValue, secondInputValue)
            .then(cardInfo => {
                const newCard = new Card(cardInfo, userId, '#place-card', apiFunctions);
                placesElem.prepend(
                    newCard.generate()
                );
                cardPopup.close();
            })
            .catch(err => console.log(err))
            .finally(() => cardPopup.loadingButton(false));
    }
);
cardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(
    '.popup_type_avatar',
    (evt, inputValuesArray) => {
        evt.preventDefault();
        const avatarLinkValue = inputValuesArray[0];
        avatarPopup.loadingButton(true);
        user.setUserAvatar(avatarLinkValue)
            .then(() => avatarPopup.close())
            .finally(() => avatarPopup.loadingButton(false));
    }
);
avatarPopup.setEventListeners();

const profilePopup = new PopupWithForm(
    '.popup_type_profile',
    (evt, inputValues) => {
        evt.preventDefault();
        const userInfo = {
            userName: inputValues[0],
            userDetails: inputValues[1]
        };
        profilePopup.loadingButton(true);
        user.setUserInfo(userInfo)
            .then(() => profilePopup.close())
            .finally(() => profilePopup.loadingButton(false));
    }
);
profilePopup.setEventListeners();


/*-------------------------------Event Listeners-----------------------------------*/
editButton.addEventListener('click', _ => {
    inputNameElem.value = profileTitle.textContent;
    inputJobElem.value = profileSubtitle.textContent;
    profileFormValidator.checkInputValidity();
    profileFormValidator.changeButtonState();
    profilePopup.open()
});

addButton.addEventListener('click', _ => {
    cardFormValidator.changeButtonState();
    cardPopup.open();
});
avatarOverlay.addEventListener('click', _ => {
    avatarFormValidator.changeButtonState();
    avatarPopup.open();
});