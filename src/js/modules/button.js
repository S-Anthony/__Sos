export default class Button {
	constructor({btnSelector = null, btnToggleClass = null, additionalSelector, additionalToggleClass}) {
		try {
			this.button = document.querySelector(btnSelector);
			this.btnToggleClass = btnToggleClass;
			this.additionalElem = document.querySelector(additionalSelector);
			this.additionalToggleClass = additionalToggleClass;
		} catch (error) {}
	}

	clickButton() {
		try {
			this.button.classList.toggle(this.btnToggleClass);
			this.additionalElem.classList.toggle(this.additionalToggleClass);
		} catch (error) {}
	}

	init() {
		this.button.addEventListener('click', (e) => {
			this.clickButton();
		});
	}
}