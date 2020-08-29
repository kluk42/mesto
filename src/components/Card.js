export class Card {
    constructor(item, cardSelector, handleCardClick, handleDeleteClick, cardId, ownerId, userId, {handleLikeClick}) {
        this._likes = item.likes;
        this._handleDeleteClick = handleDeleteClick;
        this._name = item.name;
        this._pictureLink = item.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._ownerId = ownerId;
        this._userId = userId;
        this.cardId = cardId;
        this._handleLikeClick = handleLikeClick;
    };

    _isMyCard() {
        if (this._userId === this._ownerId) {
            return true
        }
        else {
            return false
        }
    }

    _renderDeleteButton() {
        if (!this._isMyCard()) {
            this.element.querySelector('.delete-button').classList.add('delete-button_state_hidden');
        }
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content.querySelector('.card').cloneNode(true);
        return cardElement
    };

    generateCard() {
        this.element = this._getTemplate();
        const cardImg =  this.element.querySelector('.card__picture');
        const cardName = this.element.querySelector('.card__name');
        this._cardLikeNumber = this.element.querySelector('.like-section__likes-counter');
        this._likeButton = this.element.querySelector('.like-button');
        this._numberOfLikes = Object.keys(this._likes).length;

        cardImg.src = this._pictureLink;
        cardName.textContent = this._name;

        this._cardLikeNumber.textContent = this._numberOfLikes;

        if (this.isLiked()) {
            this._likeButton.classList.add('like-button_state_active');
        }

        this._renderDeleteButton();

        this._setEventListeners();

        return this.element;
    };

    deleteCard = () => {
        this.element.remove();
        this.element = null;
    };

    isLiked() {
        return !!this._likes.find(like => like._id === this._userId);
    }

    updateLikes (newLikes) {
        this._likes = newLikes;
        this._numberOfLikes = Object.keys(newLikes).length;
        this._cardLikeNumber.textContent = this._numberOfLikes;
        if (this.isLiked()) {
            this._likeButton.classList.add('like-button_state_active');
        } else {
            this._likeButton.classList.remove('like-button_state_active');
        }
    }

    _setEventListeners() {
        this.element.querySelector('.card__picture').addEventListener('click', () => {
            this._handleCardClick({src: this._pictureLink, alt: this._name});
        })

        this.element.querySelector('.delete-button').addEventListener('click', () => {
            this._handleDeleteClick(this.cardId, this.element);
        })

        this._likeButton.addEventListener('click', () => {
            this._handleLikeClick();
        })

    }
}