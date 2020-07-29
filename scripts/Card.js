import {togglePopup} from './utils.js'

export class Card {
    constructor(item, cardSelector) {
        this._name = item.name;
        this._pictureLink = item.link;
        this._cardSelector = cardSelector;
    };

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
        return cardElement
    };

    generateCard() {
        this._element = this._getTemplate();

        const cardImg =  this._element.querySelector('.card__picture');
        const cardName = this._element.querySelector('.card__name');

        cardImg.src = this._pictureLink;
        cardName.textContent = this._name;
        
        this._setEventListeners();

        return this._element;
    };

    _openPic = () => {
        const popupPicture = document.querySelector('.popup_type_picture')
        const picture = this._element.querySelector('.card__picture');
        const pictureLink = picture.src;
        const pictureAlt = picture.alt;
        const pictureDescription = this._name;
        const popupImg = document.querySelector('.popup__picture');
        popupImg.src = pictureLink;
        popupImg.alt = pictureAlt;
        document.querySelector('.popup__sign').textContent = pictureDescription;
        togglePopup(popupPicture);
    };

    _deleteCard = () => {
        this._element.remove();
    };

    _likeCard = () => {
        this._element.querySelector('.like-button').classList.toggle('like-button_state_active');
    };

    _setEventListeners() {
        this._element.querySelector('.card__picture').addEventListener('click', () => {
            this._openPic();
        })

        this._element.querySelector('.delete-button').addEventListener('click', () => {
            this._deleteCard();
        })

        this._element.querySelector('.like-button').addEventListener('click', (e) => {
            this._likeCard();
        })

    }
}