import {popupProfile, editProfileButton, addButton, formArray, initialCards, validationConfig} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../page/index.css';

const handleCardClick = (data) => {
    const popupWithImage = new PopupWithImage('.popup_type_picture');
    popupWithImage.open(data);    
}

const renderer = (item) => {
    const card = new Card(item, '#card-template', handleCardClick);
        const cardElement = card.generateCard();
        defaultCards.addItem(cardElement);
}

const defaultCards = new Section({items: initialCards, renderer: renderer}, '.gallery')
defaultCards.renderItems();

const userDataSelectors = {nameSelector: '.profile__name', infoSelector: '.profile__description'}
const userInfo = new UserInfo(userDataSelectors);

const submitProfileForm = (data) => {
    userInfo.setUserInfo(data);
}

const submitCardForm = (data) => {
    const propertyNameForPlace = 'place-input';
    const propertyNameForImgLink = 'link-input';
    const item = [{name: data[propertyNameForPlace], link: data[propertyNameForImgLink]}];
    const newCard = new Section({items: item, renderer: renderer}, '.gallery');
    newCard.renderItems();
}

const profileForm = new PopupWithForm('.popup_type_profile', submitProfileForm);

const editorForm = new PopupWithForm('.popup_type_editor', submitCardForm);
editorForm.setEventListeners();

let profilePopupValidation = '';
let editorPopupValidation = '';

formArray.forEach((form) => {
    const validation = new FormValidator(validationConfig, form);
    validation.enableValidation();
    if (form.parentElement.classList.contains('popup_type_profile')) {
        profilePopupValidation = validation;
    } else {
        editorPopupValidation = validation;
    }
})

function validateSubmitProfileButton () {
    profilePopupValidation.toggleButtonState();
}

function validateSubmitCardButton () {
    editorPopupValidation.toggleButtonState();
}

function editProfileButtonCallback () {
    profileForm.open();
    const profileData = userInfo.getUserInfo();
    popupProfile.querySelector('.form__item_content_name').value = profileData.name;
    popupProfile.querySelector('.form__item_content_description').value = profileData.description;
    validateSubmitProfileButton();
}

function addButtonCallback () {
    editorForm.open();
    validateSubmitCardButton();
}

editProfileButton.addEventListener('click', () => {editProfileButtonCallback()});
addButton.addEventListener('click', () => {addButtonCallback()});