const userDataSelectors = {nameSelector: '.profile__name', infoSelector: '.profile__description', avatarSelector: '.profile-avatar__image'};

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.submit-button',
    inactiveButtonClass: 'submit-button_disabled',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active'
  };

const popupConfirmationSelector = '.popup_type_confirmation';

const baseURL = 'https://mesto.nomoreparties.co/v1/cohort-14/';

const token = '614c831a-d135-4d7c-82ff-12ed74000dec';

export {validationConfig, userDataSelectors, popupConfirmationSelector, baseURL, token}