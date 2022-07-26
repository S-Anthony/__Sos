export default class InputValidator{
	constructor(input, additionalTrigger) {
		this.input = document.querySelector(input);
		try {
			this.additionalTrigger = document.querySelector(additionalTrigger);
		} catch (error) {}
	}

	checkInputValidity() {
		if (this.input.checkValidity()) {
			this.input.classList.remove('input_invalid');
		} else {
			this.input.classList.add('input_invalid');
		}
	}

	init() {
		this.input.addEventListener('click', () => {
			this.checkInputValidity();
		});
		this.input.addEventListener('input', () => {
			this.checkInputValidity();
		});
		try {
			this.additionalTrigger.addEventListener('click', () => {
				this.checkInputValidity();
			});
		} catch (error) {}
	} 
}