export default class UserInfo {
    constructor({nameSelector, infoSelector, avatarSelector}, userId) {
        this._userNameSelector = nameSelector;
        this._userInfoSelector = infoSelector;
        this._avatarSelector = avatarSelector;
        this._name = document.querySelector(this._userNameSelector);
        this._job = document.querySelector(this._userInfoSelector);
        this._avatar = document.querySelector(this._avatarSelector);
    }

    getUserInfo = () => {
        const userInfoFrompage = {name: document.querySelector('.profile__name').textContent, 
            description: document.querySelector('.profile__description').textContent}
            return userInfoFrompage;
    }

    setUserInfo = (data) => {
        this._name.textContent = data.name;
        this._job.textContent = data.about;
        this._avatar.src = data.avatar;
        this.userId = data._id;
    }
}