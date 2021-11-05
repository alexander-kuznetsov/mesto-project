import Popup from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector, link, name) {
        super(popupSelector);
        this._link = link;
        this._name = name;
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._imageCaption = this._popupElement.querySelector('.popup__image-caption');
    }

    open() {
        this._popupImage.src = this._link;
        this._popupImage.alt = this._name;
        this._imageCaption.textContent = this._name;

        super.open();
    }

    close() {
        super.close();
        this._popupImage.src = "";
        this._popupImage.alt = "";
    }
}