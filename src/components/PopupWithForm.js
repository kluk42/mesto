import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupWithFormSelector, formSubmit) {
        super(popupWithFormSelector);
        this._form = document.querySelector(popupWithFormSelector).querySelector('.form__container');
        this._formSubmit = formSubmit;
    }
    
    _getInputValues = () => {
        this._formInputs = Array.from(this._form.querySelectorAll('.form__item'));
        this._formValues = {};
        this._formInputs.forEach((input) =>  {
            this._formValues[input.id] = input.value;
        })
        return this._formValues;
    }

    _errorCleaner = () => {
        const errorList = this._form.querySelectorAll('.form__input-error');
        const inputList = this._form.querySelectorAll('.form__item');
        errorList.forEach(errorItem => {
            errorItem.textContent = '';
        })
        inputList.forEach(inputitem => {
            inputitem.classList.remove('form__item_type_error');
        })
    }

    _removeEventListeners = () => {
        this._form.removeEventListener('submit', this._submitCallBack);
    }

    close = () => {
        super.close();
        this._removeEventListeners();
        this._form.reset();
        this._errorCleaner();
    }

    _submitCallBack = (evt) => {
        evt.preventDefault();
        const data = this._getInputValues();
        this._formSubmit(data);
        this.close();
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._submitCallBack);
    }

}