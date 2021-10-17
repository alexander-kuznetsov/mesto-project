import {allPopups, createPlace} from "./card";
import {getUserInfo, saveCard, saveProfileInfo, updateAvatar} from "./api";
import {avatarImage, placesElem, profileSubtitle, profileTitle} from "../pages";

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

export function closeOnEscape(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = findOpened(allPopups);
        if (openedPopup !== null && openedPopup !== undefined) {
            close(openedPopup);
        }
    }
}

export function closeOnOverlay(evt) {
    if (evt.target.classList.contains('.popup')) {
        close(evt.target);
    }
}
export function profileSubmitHandler(evt) {
    evt.preventDefault();
    const inputs = evt.target.querySelectorAll('.popup__input');
    const firstInput = getPopupInput(inputs, 'firstFormInput');
    const secondInput = getPopupInput(inputs, 'secondFormInput');

    loadingButton(evt.target, true);
    saveProfileInfo(firstInput.value, secondInput.value)
        .then(profileInfo => {
            profileTitle.textContent = profileInfo.name;
            profileSubtitle.textContent = profileInfo.about;
        })
        .catch(err => console.log(err))
        .finally(() => loadingButton(evt.target, false));
}
export function cardSubmitHandler(evt) {
    evt.preventDefault();
    const inputs = evt.target.querySelectorAll('.popup__input');
    const firstInput = getPopupInput(inputs, 'firstFormInput');
    const secondInput = getPopupInput(inputs, 'secondFormInput');
    loadingButton(evt.target, true);
    saveCard(firstInput.value, secondInput.value)
        .then(cardInfo => {
            getUserInfo()
                .then(userInfo => {
                    placesElem.prepend(
                        createPlace(
                            cardInfo,
                            userInfo._id
                        )
                    );
                }).catch(err => console.log(err));
        })
        .catch(err => console.log(err))
        .finally(() => loadingButton(evt.target, false));

    clearInputs(inputs);
}

export function avatarSubmitHandler(evt) {
    evt.preventDefault();
    const avatarLinkInput = evt.target.querySelector('.popup__input');
    loadingButton(evt.target, true);
    updateAvatar(avatarLinkInput.value)
        .catch(err => console.log(err))
        .finally(() => loadingButton(evt.target, false));
    avatarImage.src = avatarLinkInput.value;
    clearInputs([avatarLinkInput]);
}

function clearInputs(inputElements) {
    Array.from(inputElements)
        .forEach(inputElement => inputElement.value = "");
}

export function getPopupInput(popupInputsElements, inputName) {
    return Array.from(popupInputsElements).find(item => item.name === inputName);
}

function loadingButton(form, isLoading) {
    const button = form.querySelector('.button');
    const buttonText = button.textContent;
    button.textContent = isLoading? `${buttonText}...`: buttonText.substring(0, buttonText.length);
}