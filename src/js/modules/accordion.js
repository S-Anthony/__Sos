export default class Accordion {
	constructor(selector, itemSelector, activeClass, beforeActiveClass = '') {
		this.accordion = document.querySelector(selector);
		this.items = document.querySelectorAll(itemSelector);
		this.itemSelector = itemSelector;
		this.activeClass = activeClass;
		this.beforeActiveClass = beforeActiveClass;
	}

	openContent(active) {
		let afterActive = false;
		this.items.forEach(item => {
			if (item === active) {
				afterActive = true;
				item.classList.add(this.activeClass);
			} else if (afterActive) {
				item.classList.remove(this.activeClass, this.beforeActiveClass);
			} else {
				item.classList.remove(this.activeClass);
				item.classList.add(this.beforeActiveClass);
			}
		});
	}

	init() {
		this.accordion.addEventListener('click', e => {
			if (e.target.closest(this.itemSelector)) {
				this.openContent(e.target.closest(this.itemSelector));
			}
		});
	}
}