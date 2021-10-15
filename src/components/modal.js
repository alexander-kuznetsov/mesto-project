import {createPlace, placesElem} from "./card";
import {profileSubtitle, profileTitle} from "../pages";

export const profilePopup = document.querySelector('.popup_type_profile');
export const imagePopup = document.querySelector('.popup_type_image');
export const cardPopup = document.querySelector('.popup_type_card');
export const allPopups = document.querySelectorAll('.popup');
const imagePopupElem = imagePopup.querySelector('.popup__image');
const imagePopupCaptionElem = imagePopup.querySelector('.popup__image-caption');
const page = document.querySelector('.page');

export function open(popup) {
    page.addEventListener('keydown', closeOnEscape);
    popup.classList.add('popup_opened');
}

export function close(popup) {
    page.removeEventListener('keydown', closeOnEscape);
    popup.classList.remove('popup_opened');
}

export function findOpened(popupArray) {
    return Array.from(popupArray).find(popup => {
        return popup.classList.contains('popup_opened');
    });
}

export function setCardPopupContent(link, name) {
    imagePopupElem.src = link;
    imagePopupElem.alt = name;
    imagePopupCaptionElem.textContent = name;
}

export function closeOnEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = findOpened(allPopups);
        if (openedPopup !== null && openedPopup !== undefined) {
            close(openedPopup);
        }
    }
}

export function closeOnOverlay(evt) {
    if (evt.target.classList.contains('popup')) {
        close(evt.target);
    }
}
export function profileSubmitHandler(evt) {
    evt.preventDefault();
    const inputs = evt.target.querySelectorAll('.popup__input');
    const firstInput = getPopupInput(inputs, 'firstFormInput');
    const secondInput = getPopupInput(inputs, 'secondFormInput');
    profileTitle.textContent = firstInput.value;
    profileSubtitle.textContent = secondInput.value;
}
export function cardSubmitHandler(evt) {
    evt.preventDefault();
    const inputs = evt.target.querySelectorAll('.popup__input');
    const firstInput = getPopupInput(inputs, 'firstFormInput');
    const secondInput = getPopupInput(inputs, 'secondFormInput');
    placesElem.prepend(createPlace(firstInput.value, secondInput.value));
    clearInputs(inputs);
}
function clearInputs(inputElements) {
    Array.from(inputElements)
        .forEach(inputElement => inputElement.value = "");
}

export function getPopupInput(popupInputsElements, inputName) {
    return Array.from(popupInputsElements).find(item => item.name === inputName);
}