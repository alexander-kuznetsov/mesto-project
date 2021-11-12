/**
 * Класс который отвечает за открытие и закрытие попапа.
 */
export default class Popup {

    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector);
        this._page = document.querySelector('.page');
    }

    /**
     * Метод открытия попапа
     */
    open() {
        this._bindedHandleEscClose = this._handleEscClose.bind(this);//привязка контекста bind изменяет сигнатуру функции, из-за этого не отрабатывает removeEventListener в методе close(). Поэтому после привязки контекста сохраняем новую функцию в локальную переменную класса и ее же перелаем в removeEventListener
        this._page.addEventListener('keydown', this._bindedHandleEscClose);
        this._popupElement.classList.add('popup_opened');
    }

    /**
     * Метод закрытия попапа
     */
    close() {
        this._page.removeEventListener('keydown', this._bindedHandleEscClose);
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