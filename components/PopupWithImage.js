import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
    constructor(popupWIthImageSelector) {
        super(popupWIthImageSelector);
        this._popupWIthImage = document.querySelector(popupWIthImageSelector);
        this._popupImage = this._popupWIthImage.querySelector('.popup__picture')
        
    }

    open(data) {
        super.open();
        this._popupImage.src = data.src;
        this._popupImage.alt = data.alt;
        this._popupWIthImage.querySelector('.popup__sign').textContent = data.alt;
    }
}