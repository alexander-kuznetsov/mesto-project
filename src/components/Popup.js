/**
 * Класс который отвечает за открытие и закрытие попапа.
 */
export default class Popup {

    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._page = document.querySelector('.page');
        this._handleEscClose = this._handleEscClose.bind(this)
    }

    /**
     * Метод открытия попапа
     */
    open() {
        this._page.addEventListener('keydown', this._handleEscClose);
        this._popupElement.classList.add('popup_opened');
    }

    /**
     * Метод закрытия попапа
     */
    close() {
        this._page.removeEventListener('keydown', this._handleEscClose);
        this._popupElement.classList.remove('popup_opened');
    }

    _handleEscClose(evt) {
        if (evt.key === 'Escape') {
            this.close()
        }
    }

    /**
     *  Метод добавляет слушатель клика иконке закрытия попапа.
     *  Модальное окно также закрывается при клике на затемнённую область вокруг формы.
     */
    setEventListeners() {
        const closeButton = this._popupElement.querySelector('.button__close');
        closeButton.addEventListener('click', () => {
            this.close();
        });

        this._popupElement.addEventListener('click', evt => {
            if (evt.target.classList.contains('popup')) {
                this.close();
            }
        });
    }
}