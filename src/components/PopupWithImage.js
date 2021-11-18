import Popup from "./Popup";

export class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupImage = this._popupElement.querySelector('.popup__image');
        this._imageCaption = this._popupElement.querySelector('.popup__image-caption');
    }

    open(link, name) {
        this._popupImage.src = link;
        this._popupImage.alt = name;
        this._imageCaption.textContent = name;

        super.open();
    }

    close() {
        super.close();
        this._popupImage.src = "";
        this._popupImage.alt = "";
    }
}