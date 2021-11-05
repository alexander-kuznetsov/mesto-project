import './index.css';
import {api} from "../components/Api";

import {
    avatarSubmitHandler,
    cardSubmitHandler,
    getPopupInput,
    profileSubmitHandler,
    close,
    open,
    closeOnOverlay
} from "../components/modal";
import {allPopups, avatarPopup, Card, cardPopup, profilePopup} from "../components/Card";
import {FormValidator} from "../components/FormValidator";
import {PopupWithImage} from "../components/PopupWithImage";
import {Section} from "../components/Section";

//TODO перенести эти объекты в более подходящее место
const formValidationSetting = {
    formInputSelector: ".popup__input",
    submitButtonSelector: ".button__save",
    inactiveButtonClass: "button_state_inactive",
    inputErrorClass: "popup__input_type_error"
}
const profileFormValidator = new FormValidator(formValidationSetting, profilePopup);
const cardFormValidator = new FormValidator(formValidationSetting, cardPopup);
const avatarFormValidator = new FormValidator(formValidationSetting, avatarPopup);
profileFormValidator.enableValidation();
cardFormValidator.enableValidation();
avatarFormValidator.enableValidation();

/*-------------------------------Profile Info-----------------------------------*/
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const avatarImage = document.querySelector('.profile__image');

/*-------------------------------Inputs-----------------------------------*/
const avatarOverlay = document.querySelector('.profile__image-overlay');
const profilePopupInputs = profilePopup.querySelectorAll('.popup__input');
const inputNameElem = getPopupInput(profilePopupInputs, 'firstFormInput');
const inputJobElem = getPopupInput(profilePopupInputs, 'secondFormInput');

/*-------------------------------Buttons-----------------------------------*/
const editButton = document.querySelector('.button__edit');
const closeButtons = document.querySelectorAll('.button__close');
const addButton = document.querySelector('.button__add');
export const placesElem = document.querySelector('.places');
export let userId;

const cardFunctions = {
    addOrDeleteLike: (cardId, method) => { return api.addOrDeleteLike(cardId, method) },
    deleteCard: (cardId) => { return api.deleteCard(cardId)},
    handleCardClick: (link, name) => {
        const popupWithImage = new PopupWithImage('.popup_type_image', link, name);
        popupWithImage.setEventListeners();
        popupWithImage.open();
    }
}

Promise.all([api.getUserInfo(), api.getInitialCards()])
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

/*----------------------------------Event Handling--------------------------------------------*/
profilePopup.addEventListener('submit', profileSubmitHandler);
cardPopup.addEventListener('submit', cardSubmitHandler);
avatarPopup.addEventListener('submit', avatarSubmitHandler);


editButton.addEventListener('click', _ => {
    inputNameElem.value = profileTitle.textContent;
    inputJobElem.value = profileSubtitle.textContent;
    profileFormValidator.checkInputValidity();
    profileFormValidator.changeButtonState();
    open(profilePopup)
});

closeButtons.forEach(button => {
    button.addEventListener('click', evt => {
        close(evt.target.closest('.popup'));
    });
});
addButton.addEventListener('click', _ => {
    cardFormValidator.changeButtonState();
    open(cardPopup);
});
avatarOverlay.addEventListener('click', _ => {
        avatarFormValidator.changeButtonState();
        open(avatarPopup);
    }
);
allPopups.forEach(popup => {
    popup.addEventListener('click', closeOnOverlay);
});