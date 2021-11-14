import Popup from "./Popup";

export class PopupWithForm extends Popup{
  /**
   * @param popupSelector - селектор попапа
   * @param submitForm - колбэк сабмита формы
   */
  constructor(popupSelector, submitForm){
    super(popupSelector);
    this._submitForm = submitForm;
    this._popupInputs = this._popupElement.querySelectorAll('.popup__input');
    this._buttonElement = this._popupElement.querySelector('.button');
    this._popupFormElement = this._popupElement.querySelector('.popup__form');
  }

  _getInputValues(){
    return Array.from(this._popupInputs)
        .map(inputElement => inputElement.value)
  }

  setEventListeners(){
    super.setEventListeners()
    this._popupElement.addEventListener(
        'submit',
        (evt) => this._submitForm(evt, this._getInputValues())
    );
  }
  loadingButton(isLoading) {
    const buttonText = this._buttonElement.textContent;
    this._buttonElement.textContent = isLoading? `${buttonText}...`: buttonText.substring(0, buttonText.length - 3);
  }
  close(){
    super.close();
    this._popupFormElement.reset();
  }
}