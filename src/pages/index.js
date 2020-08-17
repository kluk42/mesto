import {initialCards, validationConfig, userDataSelectors} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import '../pages/index.css';

const popupProfile = document.querySelector('.popup_type_profile');
const popupEditor = document.querySelector('.popup_type_editor');
const editProfileButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button')
const nameInput = popupProfile.querySelector('.form__item_content_name');
const descriptionInput = popupProfile.querySelector('.form__item_content_description');

const handleCardClick = (data) => {
    const popupWithImage = new PopupWithImage('.popup_type_picture');
    popupWithImage.open(data);
    popupWithImage.setEventListeners();
}

const renderer = (item) => {
    const card = new Card(item, '#card-template', handleCardClick);
        const cardElement = card.generateCard();
        defaultCards.addItem(cardElement);
}

const defaultCards = new Section({items: initialCards, renderer: renderer}, '.gallery')
defaultCards.renderItems();

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
profileForm.setEventListeners();

const editorForm = new PopupWithForm('.popup_type_editor', submitCardForm);
editorForm.setEventListeners();

const profilePopupValidation = new FormValidator(validationConfig, popupProfile);
profilePopupValidation.enableValidation();

const editorPopupValidation = new FormValidator(validationConfig, popupEditor);
editorPopupValidation.enableValidation();

function validateSubmitProfileButton () {
    profilePopupValidation.toggleButtonState();
}

function validateSubmitCardButton () {
    editorPopupValidation.toggleButtonState();
}

function editProfileButtonCallback () {
    profileForm.open();
    const profileData = userInfo.getUserInfo();
    nameInput.value = profileData.name;
    descriptionInput.value = profileData.description;
    profilePopupValidation.errorCleaner();
    validateSubmitProfileButton();
}

function addButtonCallback () {
    editorForm.open();
    editorPopupValidation.errorCleaner();
    validateSubmitCardButton();
}

editProfileButton.addEventListener('click', () => {editProfileButtonCallback()});
addButton.addEventListener('click', () => {addButtonCallback()});