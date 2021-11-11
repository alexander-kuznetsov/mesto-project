import Popup from "./Popup";

export class PopupWithForm extends Popup{
  /**
   * @param popupSelector - селектор попапа
   * @param submitForm - колбэк сабмита формы
   */
  constructor(popupSelector, submitForm){
    super(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues(){
    return Array.from(this._popupElement.querySelectorAll('.popup__input'))
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
    const button = this._popupElement.querySelector('.button');
    const buttonText = button.textContent;
    button.textContent = isLoading? `${buttonText}...`: buttonText.substring(0, buttonText.length - 3);
  }
  close(){
    super.close();
    this._popupElement
        .querySelector('.popup__form')
        .reset();
  }
}