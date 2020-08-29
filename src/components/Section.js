export default class Section {
    constructor({renderItems}, containerSelector) {
        this._renderer = renderItems;
        this._container = document.querySelector(containerSelector);
    }

    renderItems(cards) {
        this._renderer(cards); 
    }
}