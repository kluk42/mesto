import {validationConfig, userDataSelectors, popupConfirmationSelector, baseURL, token} from '../utils/constants.js';
import {FormValidator} from '../components/FormValidator.js';
import {Card} from '../components/Card.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js'
import '../pages/index.css';
import PopupConfirmation from '../components/PopupCOnfirmation.js';

const popupProfile = document.querySelector('.popup_type_profile');
const popupEditor = document.querySelector('.popup_type_editor');
const popupAvatar = document.querySelector('.popup_type_avatar');
const editProfileButton = document.querySelector('.edit-button');
const addButton = document.querySelector('.add-button');
const avatar = document.querySelector('.profile-avatar');
const avatarBrush = document.querySelector('.profile-avatar__brush');
const nameInput = popupProfile.querySelector('.form__item_content_name');
const descriptionInput = popupProfile.querySelector('.form__item_content_description');

const popupWithImage = new PopupWithImage('.popup_type_picture');
popupWithImage.setEventListeners();

const confirmationPopup = new PopupConfirmation(popupConfirmationSelector);
confirmationPopup.setEventListeners();

const renderLoading = loading => {
    const activePopup = document.querySelector('.popup-opener');
    const button = activePopup.querySelector('.submit-button');

    button.textContent = loading ? 'Сохранение...' : 'Сохранить';
}

const api = new Api({
    baseUrl: baseURL,
    token: token,
    renderLoading
})

const userInfo = new UserInfo(userDataSelectors);
function handleDeleteClick (cardId, card) {
    confirmationPopup.open();
    const action = () => {
        api.deleteCard(cardId).then(res => { 
            card.remove();
            confirmationPopup.close();
        })
    }
    confirmationPopup.setSubmitHandler(action);
}

const renderer = (item) => {
    const ownerId = item.owner._id;
    const cardId = item._id;
    const userIdToCard = userInfo.userId;
    const card = new Card(item, '#card-template', handleCardClick, handleDeleteClick, cardId, ownerId, userIdToCard, {handleLikeClick: () => {
        if (!card.isLiked()) {
            api.likeCard(card.cardId).then(res => {
                card.updateLikes(res.likes);
            })
        } else {
            api.dislikeCard(card.cardId).then(res => {
                card.updateLikes(res.likes);
        })
        }
    }
})
        const cardElement = card.generateCard();
        return cardElement
}

const renderItems = (data) => {
    if (data.constructor === Array) {
        data.forEach(card => {
            const renderedCard = renderer(card);
            document.querySelector('.gallery').append(renderedCard);
        })
    } else {
        const renderedCard = renderer(data);
        document.querySelector('.gallery').append(renderedCard);
    }
    
}

const cardList = new Section({renderItems});

Promise.all([
    api.getInitialCards(),
    api.getUserInfo()
]).then(res => {
    const [initialCards, userData] = res;
    userInfo.setUserInfo(userData);
    const userId = userData._id;
    cardList.renderItems(initialCards);
})

const handleCardClick = (data) => {
    popupWithImage.open(data);
}

const submitProfileForm = (data) => {
    api.sendUserInfo(data).then(res => {
        api.getUserInfo().then(userData => {
            renderLoading(false);
            userInfo.setUserInfo(userData);
            profileForm.close();
        })
    })
}

const submitCardForm = (data) => {
    const propertyNameForPlace = 'place-input';
    const propertyNameForImgLink = 'link-input';
    const item = {name: data[propertyNameForPlace], link: data[propertyNameForImgLink]};
    api.uploadCard(item).then(res => {
        cardList.renderItems(res);
        renderLoading(false);
        editorForm.close();
    })
}

const submitAvatarForm = (data) => {
    const avatarFormLinkId = 'avatar-input';
    const avatarLink = data[avatarFormLinkId];

    api.uploadAvatar(avatarLink).then(userData => {
        renderLoading(false);
        userInfo.setUserInfo(userData);
        avatarForm.close();
    })
}

const profileForm = new PopupWithForm('.popup_type_profile', submitProfileForm);
profileForm.setEventListeners();

const editorForm = new PopupWithForm('.popup_type_editor', submitCardForm);
editorForm.setEventListeners();

const avatarForm = new PopupWithForm('.popup_type_avatar', submitAvatarForm);
avatarForm.setEventListeners();

const profilePopupValidation = new FormValidator(validationConfig, popupProfile);
profilePopupValidation.enableValidation();

const editorPopupValidation = new FormValidator(validationConfig, popupEditor);
editorPopupValidation.enableValidation();

const avatarPopupValidation = new FormValidator(validationConfig, popupAvatar);
avatarPopupValidation.enableValidation();

function validateSubmitProfileButton () {
    profilePopupValidation.toggleButtonState();
}

function validateSubmitCardButton () {
    editorPopupValidation.toggleButtonState();
}

function validateSubmitAvatarButton () {
    avatarPopupValidation.toggleButtonState();
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

function brushRenderingCallback (e) {
    if (e.type === 'mouseenter') {
        avatarBrush.classList.add('profile-avatar__brush_state_visible');
    } else {
        avatarBrush.classList.remove('profile-avatar__brush_state_visible');
    }
}

function avatarClickCallBack () {
    avatarForm.open();
    avatarPopupValidation.errorCleaner();
    validateSubmitAvatarButton();
}

editProfileButton.addEventListener('click', () => {editProfileButtonCallback()});
addButton.addEventListener('click', () => {addButtonCallback()});
avatar.addEventListener('mouseenter', (e) => {brushRenderingCallback(e)});
avatar.addEventListener('mouseleave', (e) => {brushRenderingCallback(e)});
avatar.addEventListener('click', () => {avatarClickCallBack()});