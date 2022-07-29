import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
gsap.registerPlugin(ScrollToPlugin);

export default class Scroller {
	constructor(linksSelector) {
		this.links = document.querySelectorAll(linksSelector);
	}

	init() {
		this.links.forEach(link => {
			link.addEventListener('click', e => {
				e.preventDefault();
				try {
					gsap.to(window, {duration: 1, scrollTo: e.target.closest('a').getAttribute('href')});
				} catch (error) {}
			});
		});
	}
}