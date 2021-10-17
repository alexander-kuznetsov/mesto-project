import './index.css';
import {changeButtonState, checkInputValidity, enableValidation} from "../components/validation";
import {getUserInfo} from "../components/api";
import {
    avatarSubmitHandler,
    cardSubmitHandler,
    getPopupInput,
    profileSubmitHandler,
    close,
    open,
    closeOnOverlay
} from "../components/modal";
import {allPopups, avatarPopup, cardPopup, profilePopup} from "../components/card";
const validationSettings = {
    inputSelector: '.popup__input',
    submitButtonSelector: '.button',
    inactiveButtonClass: 'button_state_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
}
/*-------------------------------Profile Info-----------------------------------*/
export const profileTitle = document.querySelector('.profile__title');
export const profileSubtitle = document.querySelector('.profile__subtitle');
export const avatarImage = document.querySelector('.profile__image');

/*-------------------------------Inputs-----------------------------------*/
const avatarOverlay = document.querySelector('.profile__image-overlay');
const profilePopupInputs = profilePopup.querySelectorAll('.popup__input');
const avatarFormInput = avatarPopup.querySelector('.popup__input');
const cardPopupInputs = cardPopup.querySelectorAll('.popup__input');

/*-------------------------------Buttons-----------------------------------*/
const editButton = document.querySelector('.button__edit');
const closeButtons = document.querySelectorAll('.button__close');
const addButton = document.querySelector('.button__add');
const profileSaveButton = profilePopup.querySelector('.button__save');
const cardSaveButton = cardPopup.querySelector('.button__save');
export const placesElem = document.querySelector('.places');

getUserInfo().then(userInfo => {
    profileTitle.textContent = userInfo.name;
    profileSubtitle.textContent = userInfo.about;
    avatarImage.src = userInfo.avatar
}).catch(err => console.log(err));

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
avatarPopup.addEventListener(
    'submit', evt => {
        avatarSubmitHandler(evt);
        close(avatarPopup);
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
avatarOverlay.addEventListener('click', _ => {
        changeButtonState(
            [avatarFormInput],
            cardSaveButton,
            validationSettings.inactiveButtonClass
        );
        open(avatarPopup);
    }
);
allPopups.forEach(popup => {
    popup.addEventListener('click', closeOnOverlay);
});


enableValidation(validationSettings);