export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }

    open() {
        window.addEventListener('keydown', this._handleEscClose)
        this._popup.classList.add('popup-opener');
        this.setEventListeners();
    }

    _removeEventListeners = () => {
        window.removeEventListener('keydown', this._handleEscClose)
    }

    close() {
        this._popup.classList.remove('popup-opener');
        this._removeEventListeners();
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _clickOverlay = (evt) => {
        if (evt.target.classList.contains('popup')) {
            this.close();
        }
    }

    setEventListeners() {
        this._popup.querySelector('.close-button').addEventListener('click', () => this.close());
        this._popup.addEventListener('click', (evt) => this._clickOverlay(evt));
    }

}