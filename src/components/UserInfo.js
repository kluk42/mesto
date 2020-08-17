export default class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._userNameSelector = nameSelector;
        this._userInfoSelector = infoSelector;
        this._name = document.querySelector(this._userNameSelector);
        this._job = document.querySelector(this._userInfoSelector);
    }

    getUserInfo = () => {
        const userInfoFrompage = {name: document.querySelector('.profile__name').textContent, 
            description: document.querySelector('.profile__description').textContent}
            return userInfoFrompage;
    }

    setUserInfo = (data) => {
        const propertyNameForName = 'name-input';
        const propertyNameForJob = 'description-input';

        this._name.textContent = data[propertyNameForName];
        this._job.textContent = data[propertyNameForJob];
    }
}