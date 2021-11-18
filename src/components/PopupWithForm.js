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
    this._buttonElement.textContent = isLoading? `${this._buttonText}...`: this._buttonText.substring(0, this._buttonText.length - 3);
    //На несколько секунд в конце заместо Создать.. появляется Созд
  }
  close(){
    super.close();
    this._popupFormElement.reset();
  }
}