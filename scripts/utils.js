const popupProfile = document.querySelector('.popup_type_profile');
const nameInput = popupProfile.querySelector('.form__item_content_name');
const jobInput = popupProfile.querySelector('.form__item_content_description');
const name = document.querySelector('.profile__name');
const job = document.querySelector('.profile__description');

function escEvent(evt) {
    if (evt.key === 'Escape') {
        togglePopup(document.querySelector('.popup-opener'));
    }
}

function addWindowListener() {
    window.addEventListener('keydown', escEvent)
}

function removeWindowListener() {
    window.removeEventListener('keydown', escEvent)
}

function errorCleaner(popup) {
    const errorList = popup.querySelectorAll('.form__input-error');
    const inputList = popup.querySelectorAll('.form__item');
    errorList.forEach(errorItem => {
        errorItem.textContent = '';
    })
    inputList.forEach(inputitem => {
        inputitem.classList.remove('form__item_type_error');
    })
}

function profileEditorInitial() {
    nameInput.value = name.textContent;
    jobInput.value = job.textContent;
}

function togglePopup(popup) {
    const openningClass = document.querySelector('.popup-opener');

    if (openningClass !== null) {
        removeWindowListener()
    }
    if (openningClass === null) {
        profileEditorInitial();
        addWindowListener();
        resetPopup(popup);
    }
    popup.classList.toggle('popup-opener');
}

function resetPopup(popup) {
    if (!popup.classList.contains('popup_type_picture')) {

        if (popup.classList.contains('popup_type_editor')) {
            const submitButton = popup.querySelector('.submit-button');
            submitButton.classList.add('submit-button_disabled');
            submitButton.setAttribute('disabled', true);
            popup.querySelector('.form__container').reset();
        }
        
        errorCleaner(popup);
        }
}

export {job, name, popupProfile, jobInput, nameInput, togglePopup}