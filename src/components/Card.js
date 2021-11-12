export class Card {
    /**
     * @param data - информация о карточке
     * @param userId - идентификатор пользователя
     * @param cardTemplateSelector - селектор шаблона карточки
     * @param addOrDeleteLike - callback функция для добавления/удаления лайков
     * @param deleteCard - callback функция удаления карточки
     * @param handleCardClick - callback функция обработки клика на карточку(в текущей реализации открывает попап с картинкой)
     */
    constructor(data, userId, cardTemplateSelector, { addOrDeleteLike, deleteCard, handleCardClick }) {
        this._selector = cardTemplateSelector;
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
        this._setEventListeners(element);

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

    _setEventListeners(nextCard) {
        if (this._userId === this._data.owner._id) {
            this._setEventListenerRemoveButton(nextCard);
        }

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

        //Добавляем обработчик для открытия попапа по клику на картинку
        const cardImage = nextCard.querySelector('.place__image-link');
        cardImage.addEventListener('click', _ => {
            this._handleCardClick(this._data.link, this._data.name);
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
}

