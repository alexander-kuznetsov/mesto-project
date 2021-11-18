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
const avatarOverlay = document.querySelector('.profile__image-overlay');

const inputNameElem = profilePopupElem.querySelector('[name="firstFormInput"]');
const inputJobElem = profilePopupElem.querySelector('[name="secondFormInput"]');

const editButton = document.querySelector('.button__edit');
const addButton = document.querySelector('.button__add');
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


const popupWithImage = new PopupWithImage('.popup_type_image');
popupWithImage.setEventListeners();
/*-------------------------------Rendering-----------------------------------*/
const cardFunctions = {
    addOrDeleteLike: (cardId, method) => { return api.addOrDeleteLike(cardId, method) },
    deleteCard: (cardId) => { return api.deleteCard(cardId)},
    handleCardClick: (link, name) => {
        popupWithImage.open(link, name);
    }
}

function createCard(cardInfo) {
    return new Card(cardInfo, userId, '#place-card', cardFunctions);
}

const cardsSection = new Section(
    (cardInfo) => {
        const card = createCard(cardInfo);
        return card.generate();
    },'.places'
);

Promise.all([user.getUserInfo(), api.getInitialCards()])
    .then(resultArray => {
        const userInfo = resultArray[0];
        user.setUserInfo(
            {
                userName: userInfo.name,
                userDetails: userInfo.about
            },
            false
        );
        user.setUserAvatar(userInfo.avatar,false);
        userId = userInfo._id;

        const cardsArray = resultArray[1];

        cardsSection.renderItems(Array.from(cardsArray));
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
    (evt, formValues) => {
        evt.preventDefault();
        cardPopup.loadingButton(true);
        api.saveCard(formValues.firstFormInput, formValues.secondFormInput)
            .then(cardInfo => {
                cardsSection.renderItems(Array.of(cardInfo));
                cardPopup.close();
            })
            .catch(err => console.log(err))
            .finally(() => cardPopup.loadingButton(false));
    }
);
cardPopup.setEventListeners();

const avatarPopup = new PopupWithForm(
    '.popup_type_avatar',
    (evt, formValues) => {
        evt.preventDefault();
        avatarPopup.loadingButton(true);
        user.setUserAvatar(formValues.firstFormInput, true)
            .then(() => avatarPopup.close())
            .finally(() => avatarPopup.loadingButton(false))
            .catch(err => console.log(err));
    }
);
avatarPopup.setEventListeners();

const profilePopup = new PopupWithForm(
    '.popup_type_profile',
    (evt, formValues) => {
        evt.preventDefault();
        const userInfo = {
            userName: formValues.firstFormInput,
            userDetails: formValues.secondFormInput
        };
        profilePopup.loadingButton(true);
        user.setUserInfo(userInfo, true)
            .then(() => profilePopup.close())
            .finally(() => profilePopup.loadingButton(false))
            .catch(err => console.log(err));
    }
);
profilePopup.setEventListeners();


/*-------------------------------Event Listeners-----------------------------------*/
editButton.addEventListener('click', _ => {
    user.setUserInfoToProfilePopup(inputNameElem,inputJobElem)
    .then (() =>{
        profileFormValidator.checkFormValidity();
        profileFormValidator.changeButtonState();
        profilePopup.open()
    })    
    .catch(err => console.log(err));
});

addButton.addEventListener('click', _ => {
    cardFormValidator.changeButtonState();
    cardPopup.open();
});
avatarOverlay.addEventListener('click', _ => {
    avatarFormValidator.changeButtonState();
    avatarPopup.open();
});