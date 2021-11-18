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
    this._buttonText = this._buttonElement.textContent;
  }

  _getInputValues(){
    const formValues = {};
    Array.from(this._popupInputs)
        .forEach(inputElement => formValues[inputElement.name] = inputElement.value)
    return formValues;
  }

  setEventListeners(){
    super.setEventListeners()
    this._popupElement.addEventListener(
        'submit',
        (evt) => this._submitForm(evt, this._getInputValues())
    );
  }
  loadingButton(isLoading) {
    this._buttonElement.textContent = isLoading? `${this._buttonText}...`: this._buttonText;
  }
  close(){
    super.close();
    this._popupFormElement.reset();
  }
}