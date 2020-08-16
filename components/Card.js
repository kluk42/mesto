export class Card {
    constructor(item, cardSelector, handleCardClick) {
        this._name = item.name;
        this._pictureLink = item.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
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

    _deleteCard = () => {
        this._element.remove();
    };

    _likeCard = () => {
        this._element.querySelector('.like-button').classList.toggle('like-button_state_active');
    };

    _setEventListeners() {
        this._element.querySelector('.card__picture').addEventListener('click', () => {
            this._handleCardClick({src: this._pictureLink, alt: this._name});
        })

        this._element.querySelector('.delete-button').addEventListener('click', () => {
            this._deleteCard();
        })

        this._element.querySelector('.like-button').addEventListener('click', () => {
            this._likeCard();
        })

    }
}