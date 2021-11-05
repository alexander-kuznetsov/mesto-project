
export const imagePopup = document.querySelector('.popup_type_image');
export const profilePopup = document.querySelector('.popup_type_profile');
export const cardPopup = document.querySelector('.popup_type_card');
export const avatarPopup = document.querySelector('.popup_type_avatar');
export const allPopups = document.querySelectorAll('.popup');


export class Card {
    constructor(data, userId, selector, { addOrDeleteLike, deleteCard, handleCardClick }) {
        this._selector = selector;
        this._data = data;
        this._userId = userId;
        this._addOrDeleteLike = addOrDeleteLike;
        this._deleteCard = deleteCard;
        this._handleCardClick = handleCardClick;
    }

    _getElement() {
        const nextCard = document.querySelector(this._selector)
            .content
            .cloneNode(true);
        this._setCardContent(nextCard);
        return nextCard;
    }

    generate() {
        const element = this._getElement();
        this._setEventListenerLike(element);
        this._setEventListenerOpenPopup(element);

        if (this._userId === this._data.owner._id) {
            this._setEventListenerRemoveButton(element);
        }

        return element;
    }

    _setCardContent(nextCard) {
        const place = nextCard.querySelector('.place');
        place.id = this._data._id; //задаем идентификатор элементу place

        //добавляем карточке картинку места и его название
        const placeImage = place.querySelector('.place__image');
        placeImage.src = this._data.link;
        placeImage.alt = this._data.name;

        //проверяем - лайкали ли мы эту карточку? Если да - добавляем карточке лайк
        const isLiked = Array.from(this._data.likes)
            .some(like => { return like._id === this._userId });

        //добавляем карточке лайк
        if (isLiked) {
            place.querySelector('.button__like')
                .classList.add('button__like_active');
        }

        //заполняем заголовок карточки
        place.querySelector('.place__title').textContent = this._data.name;
        //проставляем количество лайков
        place.querySelector('.place__like-count').textContent =
            Array.from(this._data.likes).length.toString();

        if (this._userId !== this._data.owner._id) {
            place.querySelector('.button__remove')
                .classList.add('button_visible_hidden');
        }
    }

    _setEventListenerLike(nextCard) {
        //Добавляем обработчик лайков
        nextCard.querySelector('.button__like')
            .addEventListener('click', evt => {
                const buttonLike = evt.target;
                const method = buttonLike.classList
                    .contains('button__like_active') ? 'DELETE' : 'PUT';
                this._addOrDeleteLike(this._data._id, method)
                    .then(cardInfo => {
                        const cardId = cardInfo._id;
                        const card = document.querySelector(`#${CSS.escape(cardId)}`);
                        card.querySelector('.place__like-count').textContent =
                            Array.from(cardInfo.likes).length.toString();
                        buttonLike.classList.toggle('button__like_active');
                    }).catch(err => console.log(err));
            });
    }

    _setEventListenerRemoveButton(nextCard) {
        //Добавляем обработчик для кнопки удаления карточки
        nextCard.querySelector('.button__remove')
            .addEventListener('click', evt => {
                this._deleteCard(this._data._id)
                    .then(() => evt.target.closest('.place').remove())
                    .catch(err => console.log(err));
            });
    }

    _setEventListenerOpenPopup(nextCard) {
        //Добавляем обработчик для открытия попапа по клику на картинку
        const cardImage = nextCard.querySelector('.place__image-link');
        cardImage.addEventListener('click', _ => {
            this._handleCardClick(this._data.link, this._data.name);
        });
    }
}

