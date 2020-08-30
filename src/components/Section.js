export default class Section {
    constructor({renderItems}, locationSelector) {
        this._renderer = renderItems;
        this._selector = locationSelector;
    }

    renderItems(items) {
        this._renderer(items); 
    }

    addItem(item) {
        this._container = document.querySelector(this._selector);
        this._container.prepend(item);
    }
}