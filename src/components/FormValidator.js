/**
 *  Класс для настройки валидации полей формы
 */
export class FormValidator {
    constructor(
        { formInputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass },//объект настроек с селекторами и классами формы + применяем деструктуризацию
        formElement// форма, которую нужно провалидировать
    ) {
        this._formInputs = Array.from(formElement.querySelectorAll(formInputSelector));
        this._inputErrorClass = inputErrorClass;
        this._formElement = formElement;
        this._buttonElement = formElement.querySelector(submitButtonSelector);
        this._inactiveButtonClass = inactiveButtonClass;
    }

    enableValidation() {
        this.changeButtonState();
        this._formInputs.forEach(input => this._addEventListener(input));
    }

    changeButtonState() {
        const isFormInvalid = Array.from(this._formInputs)
            .some(input => { return !input.validity.valid });

        if (isFormInvalid) {
            this._buttonElement.disabled = true;
            this._buttonElement.classList.add(this._inactiveButtonClass);
        } else {
            this._buttonElement.disabled = false;
            this._buttonElement.classList.remove(this._inactiveButtonClass);
        }
    }

    checkInputValidity() {
        this._formInputs.forEach(inputElement => {
            if (inputElement.validity.valid) {
                this._hideError(inputElement);
            } else {
                this._showError(inputElement);
            }
        })
    }

    _showError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);
        errorElement.textContent = inputElement.validationMessage;
    }

    _hideError(inputElement) {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.textContent = "";
    }

    _addEventListener(inputElement) {
        inputElement.addEventListener('input', _ => {
            this.checkInputValidity();
            this.changeButtonState();
        });
    }
}

