import Request from "../services/requests";
import Modal from "./modals";
export default class Form{
	constructor({input = null, button = null, form = null, url = null, buttonLoadingClass, formDisableClass}) {
		this.input = document.querySelector(input);
		this.form = document.querySelector(form);
		this.url = url;
		try {
			this.button = document.querySelector(button);
			this.buttonLoadingClass = buttonLoadingClass;
			this.formDisableClass = formDisableClass;
		} catch (error) {}
	}

	sendForm() {
		if (this.buttonLoadingClass && this.button) this.button.classList.add(this.buttonLoadingClass);

		new Request().postData(this.url, this.form)
		.then(res => {
			if (this.formDisableClass) this.form.classList.add(this.formDisableClass);
			const successModal = new Modal('.modal.modal_ok', 'flex', 2000);
			successModal.init();
			successModal.showModal();
		})
		.catch(() => {
			const failModal = new Modal('.modal.modal_fail', 'flex', 2000);
			failModal.init();
			failModal.showModal();
		})
		.finally(() => {
			setTimeout(() => {
				this.input.value = '';
			}, 1400);
			if (this.buttonLoadingClass && this.button) this.button.classList.remove(this.buttonLoadingClass);
		});
	}

	init() {
		this.form.addEventListener('submit', e => {
			e.preventDefault();
			this.sendForm();
		});
	}
}