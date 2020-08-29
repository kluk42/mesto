export default class Api {
    constructor({ baseUrl, token, renderLoading}) {
        this._baseUrl = baseUrl;
        this._token = token;
        this._renderLoading = renderLoading;
    }

    getInitialCards () {
        return fetch(`${this._baseUrl}cards`, {
            headers: {
                authorization: this._token,
                'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(cards => {
            return cards
        })
    }

    getUserInfo () {
        return fetch(`${this._baseUrl}users/me`, {
            headers: {
                authorization: this._token,
                'content-type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            return data
        })
    }

    sendUserInfo(data) {
        this._renderLoading(true);
        this._nameKey = 'name-input';
        this._descriptionInput = 'description-input'
        return fetch(`${this._baseUrl}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
        },
            body: JSON.stringify({
            name: data[this._nameKey],
            about: data[this._descriptionInput]
  })
})
        .then(res => res.json())
    }

    getCardId(card) {
        this._cardId = card._id;
    }

    deleteCard (id) {
        return fetch(`${this._baseUrl}cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'content-type': 'application/json'
            },
        })
    }

    likeCard (id) {
        return fetch(`${this._baseUrl}cards/likes/${id}`, {
            method: 'PUT',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
    }

    dislikeCard (id) {
        return fetch(`${this._baseUrl}cards/likes/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
    }

    uploadCard (card) {
        this._renderLoading(true);
        return fetch(`${this._baseUrl}cards`, {
            method: 'POST',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: card.name,
                link: card.link
            })
        })
        .then(res => res.json())
    }

    uploadAvatar (avatarLink) {
        this._renderLoading(true);
        return fetch(`${this._baseUrl}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: this._token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: avatarLink
            })
        })
        .then(res => res.json())
    }
}