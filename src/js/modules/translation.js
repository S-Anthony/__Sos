import Modal from "./modals";
export default class Translation {
	constructor(langArr, containerSlector, langAttribute, loadingScreenSelector) {
		this.langArr = langArr;
		this.langAttribute = langAttribute;
		this.containerSlector = containerSlector;
		this.container = document.querySelector(`.${containerSlector}`);
		this.allItems = document.querySelectorAll(`[${langAttribute}]`);
		try {
			this.loadingScreen = new Modal(loadingScreenSelector, 'block');
			this.loadingScreen.init();
		} catch (error) {}
	}

	changeLanguage() {
		let lang = localStorage.getItem('lang') ? localStorage.getItem('lang') : 'en';

		if (this.loadingScreen) this.loadingScreen.showModal();

		this.allItems.forEach(item => {
			item.style.display = 'list-item';
			if (item.getAttribute(this.langAttribute) === lang) {
				item.style.display = 'none';
			}
		});
		
		document.querySelector('title').innerHTML = this.langArr['website-title'][lang];
		document.documentElement.setAttribute("lang", this.langArr['website-lang'][lang]);
		for (let key in this.langArr) {
			let elem = document.querySelector('.lang-' + key);
			if (elem) {
				elem.innerHTML = this.langArr[key][lang];
			}
		}

		if (this.loadingScreen) this.loadingScreen.hideModal();
	}

	init() {
		this.container.addEventListener('click', (e) => {
			this.container.classList.toggle(this.containerSlector+'_active');
			if (e.target.hasAttribute(this.langAttribute)) {
				localStorage.setItem('lang', `${e.target.getAttribute(this.langAttribute)}`);
				this.changeLanguage();
			}
		});

		this.changeLanguage();
	}
}