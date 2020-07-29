import {job, name, popupProfile, jobInput, nameInput, togglePopup} from './utils.js';
import {initialCards} from './initial-cards.js';
import {FormValidator} from './FormValidator.js';
import {validationConfig} from './validationConfig.js';
import {Card} from './Card.js';

const popupEditor = document.querySelector('.popup_type_editor');
const popupPicture = document.querySelector('.popup_type_picture');
const editProfileButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button')


const cardNameInput = popupEditor.querySelector('.form__item_content_place-name');
const cardLink = popupEditor.querySelector('.form__item_content_link');

const gallerySection = document.querySelector('.gallery');

const formArray = Array.from(document.querySelectorAll('.form'));

initialCards.forEach((item) => {
    const card = new Card(item, '#card-template');
    const cardElement = card.generateCard();
    gallerySection.append(cardElement);
});

let profilePopupValidation = '';

formArray.forEach((form) => {
    const validation = new FormValidator(validationConfig, form);
    validation.enableValidation();
    if (form.parentElement.classList.contains('popup_type_profile')) {
        profilePopupValidation = validation;
    }
})

function validateSubmitProfileButton () {
    profilePopupValidation.toggleButtonState();
}

function clickOverlay(evt) {
    if ((evt.target.classList.contains('popup')) && (document.querySelector('.popup__opener') !== null)) {
        togglePopup(evt.target.closest('.popup'));
        validateSubmitProfileButton();
    }
}

function formSubmitProfileHandler (evt) {
    evt.preventDefault();
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;

    togglePopup(popupProfile);
}

function formSubmitCardHandler (evt) {
    evt.preventDefault ();
    const card = new Card ({
        name: cardNameInput.value,
        link: cardLink.value
    }, '#card-template')
    gallerySection.prepend(card.generateCard());

    togglePopup(popupEditor);
}

function editProfileButtonCallBack () {
    togglePopup(popupProfile);
    validateSubmitProfileButton()
}

editProfileButton.addEventListener('click', () => {editProfileButtonCallBack()});
popupProfile.querySelector('.close-button').addEventListener('click', () => togglePopup(popupProfile));
popupProfile.querySelector('.form__container').addEventListener('submit', formSubmitProfileHandler);
popupProfile.addEventListener('click', (evt) => clickOverlay(evt));

addButton.addEventListener('click', () => {togglePopup(popupEditor);});
popupEditor.querySelector('.close-button').addEventListener('click', () => togglePopup(popupEditor));
popupEditor.querySelector('.form__container').addEventListener('submit', (evt) => formSubmitCardHandler(evt));
popupEditor.addEventListener('click', (evt) => clickOverlay(evt));

popupPicture.querySelector('.close-button').addEventListener('click', () => togglePopup(popupPicture));
popupPicture.addEventListener('click', (evt) => clickOverlay(evt));