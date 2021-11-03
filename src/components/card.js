/*-------------------------------Popups-----------------------------------*/
import { api } from "./api";
import {placesElem, userId} from "../pages";
import {open} from "./modal";

export const imagePopup = document.querySelector('.popup_type_image');
export const profilePopup = document.querySelector('.popup_type_profile');
export const cardPopup = document.querySelector('.popup_type_card');
export const avatarPopup = document.querySelector('.popup_type_avatar');
export const allPopups = document.querySelectorAll('.popup');

const cardTemplate = document.querySelector('#place-card').content;
const imagePopupElem = imagePopup.querySelector('.popup__image');
const imagePopupCaptionElem = imagePopup.querySelector('.popup__image-caption');


export function createPlace(
    cardInfo,
    userId
) {
    const nextCard = cardTemplate.cloneNode(true);
    setCardContent(nextCard, cardInfo, userId);
    //Добавляем обработчик лайков
    nextCard.querySelector('.button__like')
        .addEventListener('click', evt => {
            const buttonLike = evt.target;
            const method = buttonLike.classList
                .contains('button__like_active') ? 'DELETE' : 'PUT';
                addOrDeleteLike(cardInfo._id, method)
                .then(cardInfo => {
                    const cardId = cardInfo._id;
                    const card  = document.querySelector(`#${CSS.escape(cardId)}`);
                    card.querySelector('.place__like-count').textContent =
                        Array.from(cardInfo.likes).length.toString();
                    buttonLike.classList.toggle('button__like_active');
                }).catch(err => console.log(err));
        });

    if (userId !== cardInfo.owner._id) {
        nextCard.querySelector('.button__remove')
            .classList.add('button_visible_hidden');
    } else {
        //Добавляем обработчик для кнопки удаления карточки
        nextCard.querySelector('.button__remove')
            .addEventListener('click', evt => {
                deleteCard(cardInfo._id)
                    .then(() => evt.target.closest('.place').remove())
                    .catch(err => console.log(err));
            });
    }

    //Добавляем обработчик для открытия попапа по клику на картинку
    const cardImage = nextCard.querySelector('.place__image-link');
    cardImage.addEventListener('click', _ => {
            setImagePopupContent(cardInfo.link, cardInfo.name)
            open(imagePopup)
        }
    );
    return nextCard;
}
export function setImagePopupContent(link, name) {
    imagePopupElem.src = link;
    imagePopupElem.alt = name;
    imagePopupCaptionElem.textContent = name;
}


function setCardContent(nextCard, cardInfo, userId) {
    const placeImage = nextCard.querySelector('.place__image');
    const place = nextCard.querySelector('.place');
    const buttonLike = nextCard.querySelector('.button__like');
    const isLiked = Array.from(cardInfo.likes).some(like => {
       return like._id === userId;
    });
    if (isLiked) {
        buttonLike.classList.add('button__like_active');
    }
    placeImage.src = cardInfo.link;
    placeImage.alt = cardInfo.name;
    place.id = cardInfo._id;
    nextCard.querySelector('.place__title').textContent = cardInfo.name;
    nextCard.querySelector('.place__like-count').textContent =
        Array.from(cardInfo.likes).length.toString();
}

export function renderCards(initialCards) {
    Array.from(initialCards).forEach(cardInfo => {
        placesElem.prepend(
            createPlace(cardInfo, userId)
        );
    });
}

class Card {
    constructor(data, selector){
        this.selector = selector,
    }
}

