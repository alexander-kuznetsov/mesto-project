import './index.css';

import {changeButtonState, checkInputValidity, enableValidation} from "../components/validation";
import {
    allPopups,
    cardPopup,
    cardSubmitHandler,
    close,
    closeOnOverlay,
    getPopupInput,
    open,
    profilePopup,
    profileSubmitHandler
} from "../components/modal";

export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
const profilePopupInputs = profilePopup.querySelectorAll('.popup__input');
const cardPopupInputs = cardPopup.querySelectorAll('.popup__input');
const editButton = document.querySelector('.button__edit');
const closeButtons = document.querySelectorAll('.button__close');
const addButton = document.querySelector('.button__add');
const profileSaveButton = profilePopup.querySelector('.button__save');
const cardSaveButton = cardPopup.querySelector('.button__save');

const validationSettings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.button',
    inactiveButtonClass: 'button_state_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}

/*----------------------------------Event Handling--------------------------------------------*/
profilePopup.addEventListener(
    'submit', evt => {
        profileSubmitHandler(evt);
        close(profilePopup);
    }
)
cardPopup.addEventListener(
    'submit', evt => {
        cardSubmitHandler(evt);
        close(cardPopup);
    }
);

editButton.addEventListener('click', _ => {
    const inputNameElem = getPopupInput(profilePopupInputs, 'firstFormInput');
    const inputJobElem = getPopupInput(profilePopupInputs, 'secondFormInput');
    inputNameElem.value = profileTitle.textContent;
    inputJobElem.value = profileSubtitle.textContent;
    checkInputValidity(
        profilePopup,
        profilePopupInputs,
        validationSettings.inputErrorClass
    );
    changeButtonState(
        [inputNameElem, inputJobElem],
        profileSaveButton,
        validationSettings.inactiveButtonClass
    );
    open(profilePopup)
});

closeButtons.forEach(button => {
    button.addEventListener('click', evt => {
        close(evt.target.closest('.popup'));
    });
});
addButton.addEventListener('click', _ => {
    changeButtonState(
        cardPopupInputs,
        cardSaveButton,
        validationSettings.inactiveButtonClass
    );
    open(cardPopup);
});

allPopups.forEach(popup => {
    popup.addEventListener('click', closeOnOverlay);
});

enableValidation(validationSettings);




