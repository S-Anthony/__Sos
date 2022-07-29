import gsap from "gsap";

export default class Modal{
	constructor(selector, style, closeTime) {
		this.style = style;
		this.modal = document.querySelector(selector);
		this.closeTime = +closeTime;
	}

	hideModal() {
		gsap.to(this.modal, {opacity: 0, duration: 1, onComplete: () => {
			this.modal.style.display = "none";
		}});
	}

	showModal() {
		gsap.to(this.modal, {opacity: 1, duration: 1, onStart: () => {
			this.modal.style.display = this.style;
		}});
		if (this.closeTime) {
			setTimeout(() => {
				this.hideModal();
			}, this.closeTime);
		}
	}

	init() {
		this.modal.addEventListener('click', () => {
			this.hideModal();
		});
	}
}