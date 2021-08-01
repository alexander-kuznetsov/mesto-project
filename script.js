/*-------------------Common functions--------------------*/
function openPopup(popup) {
    popup.classList.add('popup_opened');
}
function closePopup(popup) {
    popup.classList.remove('popup_opened');
}
function getProfileTitle() {
    return document.querySelector('.profile__title');
}
function getProfileSubtitle() {
    return document.querySelector('.profile__subtitle');
}

/* ---------------------------------FORM POPUP----------------------------------------*/
function renderFormPopup(formPopup, popupInfo) {
    formPopup.querySelector('.popup__title').textContent = popupInfo.title;
    formPopup.querySelectorAll('.popup__input').forEach(input => {
        switch (input.name) {
            case 'firstFormInput': input.placeholder = popupInfo.firstInputPlaceHolder;
                input.value = '';
                break;
            case 'secondFormInput': input.placeholder = popupInfo.secondInputPlaceHolder;
                input.value = '';
                break;
        }
    });
    formPopup.querySelector('.button__save').textContent = popupInfo.buttonText;
}

function formPopupSubmitHandler(evt) {
    evt.preventDefault();
    console.log(evt);
    const buttonText = evt.target.querySelector('.button__save').innerText;
    const popup = document.querySelector('.popup');
    const firstInputValue = getPopupInputValue('firstFormInput', popup);
    const secondInputValue = getPopupInputValue('secondFormInput', popup);

    if (buttonText === 'Сохранить') {
        if (firstInputValue !== '') {
            getProfileTitle().textContent = firstInputValue;
            getProfileSubtitle().textContent = secondInputValue !== ''? secondInputValue : 'Профессия не указана';
        }

    } else if (buttonText === 'Создать') {
        if (firstInputValue !== '' && secondInputValue.startsWith('https://')) {
            addPlace(
                createPlace(firstInputValue, secondInputValue)
            );
        }
    }
    closePopup(popup);
}
function getPopupInputValue(inputName, formPopup) {
    return Array.from(formPopup.querySelectorAll('.popup__input'))
        .find(item => item.name === inputName).value;
}

document.querySelector('.popup_form')
    .querySelector('.popup__form')
    .addEventListener('submit', formPopupSubmitHandler);

/* -----------------------------IMAGE POPUP-------------------------------------*/
function renderImagePopup(imageInfo) {
    const popupImageElem = document.querySelector('.popup_image');
    const popupImage = popupImageElem.querySelector('.popup__image');
    popupImage.src = imageInfo.imageElem.src;
    popupImage.alt = imageInfo.imageElem.alt;

    popupImageElem.querySelector('.popup__image-caption').textContent = imageInfo.caption;

    return popupImageElem;
}

/* -----------------------------EDIT BUTTON-------------------------------------*/
const editButton = document.querySelector('.button__edit');
editButton.addEventListener('click', _ => {
    const profilePopupInfo = {
        title: 'Редактировать профиль',
        firstInputPlaceHolder: 'Полное имя',
        secondInputPlaceHolder: 'Профессия',
        buttonText: 'Сохранить'
    };
    const formPopup = document.querySelector('.popup');
    renderFormPopup(formPopup, profilePopupInfo);
    const profileInputs = formPopup.querySelectorAll('.popup__input');
    profileInputs.forEach(input => {
        switch (input.name) {
            case 'firstFormInput': input.value = getProfileTitle().textContent;
                break;
            case 'secondFormInput': input.value = getProfileSubtitle().textContent;
                break;
        }
    })

    openPopup(formPopup);
});

/*----------------------------CLOSE BUTTON-----------------------------------------*/
const closeButtons = document.querySelectorAll('.button__close');
closeButtons.forEach(button => {
   button.addEventListener('click',evt => {
       closePopup(evt.target.closest('.popup'))
   });
});

/* -----------------------------ADD BUTTON-------------------------------------*/
const addButton = document.querySelector('.button__add');
addButton.addEventListener('click', _ => {
    const placePopupInfo = {
        title: 'Новое место',
        firstInputPlaceHolder: 'Название',
        secondInputPlaceHolder: 'Ссылка на карточку',
        buttonText: 'Создать'
    };
    const formPopup = document.querySelector('.popup_form');
    renderFormPopup(formPopup, placePopupInfo);
    openPopup(formPopup);
});


/*---------------------------------------PLACES INIT-----------------------------------------*/
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];
initialCards.forEach(item => {
    addPlace(
        createPlace(item.name, item.link)
    );
});

function createPlace(name, link) {
    const cardTemplate = document.querySelector('#place-card').content;
    const nextCard = cardTemplate.cloneNode(true);

    const placeImage = nextCard.querySelector('.place__image');
    placeImage.src = link;
    placeImage.alt = name;

    nextCard.querySelector('.place__title')
        .textContent = name;
    //Добавляем обработчик лайков
    const likeButton = nextCard.querySelector('.button__like');
    likeButton.addEventListener('click', evt => {
        evt.target.classList.toggle('button__like_active');
    });

    const removeButton = nextCard.querySelector('.button__remove');
    removeButton.addEventListener('click', evt => {
        evt.target.closest('.place').remove();
        }
    );
    const cardFigure = nextCard.querySelector('.place__image-link');
    cardFigure.addEventListener('click', evt => {
        const imageElem = evt.target.closest('.place__image');
        const placeTitle = evt.target.closest('.place__title');
        const popupImageElem = renderImagePopup({
            imageElem: imageElem,
            caption: placeTitle
        });
        openPopup(popupImageElem);
    });
    return nextCard;
}
function addPlace(place) {
    const places = document.querySelector('.places');
    places.prepend(place);
}




