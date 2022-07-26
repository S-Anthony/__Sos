import Request from "../services/requests";
export default class Form{
	constructor({input = null, button = null, form = null, url = null, okModal, failModal, buttonLoadingClass, formDisableClass}) {
		this.input = document.querySelector(input);
		this.form = document.querySelector(form);
		this.url = url;
		try {
			this.button = document.querySelector(button);
			this.okModal = document.querySelector(okModal);
			this.failModal = document.querySelector(failModal);
			this.buttonLoadingClass = buttonLoadingClass;
			this.formDisableClass = formDisableClass;
		} catch (error) {}
	}

	sendForm() {
		if (this.buttonLoadingClass && this.button) this.button.classList.add(this.buttonLoadingClass);

		new Request().postData(this.url, this.form)
		.then(res => {
			if (this.formDisableClass) this.form.classList.add(this.formDisableClass);
			if (this.okModal) this.okModal.style.display = 'flex';
			console.log(res);
		})
		.catch(() => {
			if (this.failModal) this.failModal.style.display = 'flex';
		})
		.finally(() => {
			setTimeout(() => {
				if (this.okModal) this.okModal.style.display = 'none';
				if (this.failModal) this.failModal.style.display = 'none';
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