export default class Section {
    constructor({renderItems}) {
        this._renderer = renderItems;
    }

    renderItems(cards) {
        this._renderer(cards); 
    }
}