import Popup from "./Popup";

export class PopupWithForm extends Popup{
  /**
   * @param popupSelector - селектор попапа
   * @param submitForm - колбэк сабмита формы
   */
  constructor(popupSelector, submitForm){
    super(popupSelector);
    this._submitForm = submitForm;
    this.button = this._popupElement.querySelector('.button');
    this.buttonText = this.button.textContent;
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
    this.button.textContent = isLoading? `${this.buttonText}...`: this.buttonText.substring(0, this.buttonText.length - 3);
    //в этой строчке при создании карточки на несколько секунд появляеется слово Созд, заместо Создать...
  }
  close(){
    super.close();
    this._popupElement
        .querySelector('.popup__form')
        .reset();
  }
}