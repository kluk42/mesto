const popupProfile = document.querySelector('.popup_type_profile');
const nameInput = popupProfile.querySelector('.form__item_content_name');
const jobInput = popupProfile.querySelector('.form__item_content_description');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');

const editProfileButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button')
const formArray = Array.from(document.querySelectorAll('.form'));

const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const validationConfig = {
    formSelector: '.form',
    inputSelector: '.form__item',
    submitButtonSelector: '.submit-button',
    inactiveButtonClass: 'submit-button_disabled',
    inputErrorClass: 'form__item_type_error',
    errorClass: 'form__input-error_active'
  };

export {popupProfile, nameInput, jobInput, name, job, editProfileButton, addButton, formArray, initialCards, validationConfig}