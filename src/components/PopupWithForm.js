import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
    constructor(popupWithFormSelector, formSubmit) {
        super(popupWithFormSelector);
        this._form = document.querySelector(popupWithFormSelector).querySelector('.form');
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

    close = () => {
        super.close();
        this._form.reset();
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