import Popup from "./Popup";
import {api, apiFunctions} from "./Api";

export class PopupWithForm extends Popup{
  constructor(popupSelector,submitForm){
    super(popupSelector);
    this._submitForm = submitForm;
  }

  _getInputValues(){

  }

  setEventListeners(){
    super.setEventListeners()
    this._popupElement.addEventListener('submit', this._submitForm);
  }

  close(){
    super.close();
    this._popupElement.reset()
  }
}