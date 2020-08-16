export default class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._userNameSelector = nameSelector;
        this._userInfoSelector = infoSelector;
    }

    getUserInfo = () => {
        const userInfoFrompage = {name: document.querySelector('.profile__name').textContent, 
            description: document.querySelector('.profile__description').textContent}
            return userInfoFrompage;
    }

    setUserInfo = (data) => {
        const propertyNameForName = 'name-input';
        const propertyNameForJob = 'description-input';

        const name = document.querySelector(this._userNameSelector);
        const job = document.querySelector(this._userInfoSelector);
        name.textContent = data[propertyNameForName];
        job.textContent = data[propertyNameForJob];
    }
}