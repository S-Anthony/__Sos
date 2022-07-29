import { gsap} from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default class Animations {
	constructor() {}

	createScrollTrigger(trigger, start = 'top center') {
		if (window.matchMedia('(max-width: 26.5em)').matches) {
			start = '30% bottom';
		}
		return {
			trigger: trigger,
			start: start
		};
	}

	timelineWithScrollTrigger(trigger, start) {
		return gsap.timeline({
			scrollTrigger: this.createScrollTrigger(trigger, start)
		});
	}

	mainSection() {
		let tl = gsap.timeline();
		tl
		  .from('.main', {duration: 0.1, display: 'none'})
		  .from('.header', {duration: 1, yPercent: -60, opacity: 0})
		  .from('.main__container h1.title, .main__container h2.title', {duration: 1, x: -200, opacity: 0,ease: "elastic.out(1, 0.3)"}, "<0.5")
		  .from('.main__container .button', {duration: 0.2, y: 900, opacity: 0, pointerEvents: 'none'}, "<");
	}

	gallerySection() {
		this.timelineWithScrollTrigger('.gallery')
		  .from('.gallery__text', {duration: 1, x: -500, opacity: 0})
		  .from('.gallery__slider', {duration: 1, x: 500, opacity: 0}, "<");
	}
	
	featuresSection() {
		this.timelineWithScrollTrigger('.features')
		  .from('.features h3.title, .features h2.title', {duration: 1, yPercent: 20, opacity: 0})
		  .from('.features__item', {duration: 1, yPercent: 20, opacity: 0, stagger: 0.1}, '<0.5');
	}

	reqSection() {
		this.timelineWithScrollTrigger('.req')
		  .from('.req h3.title, .req h2.title', {duration: 1, xPercent: 60, opacity: 0, ease: "elastic.out(1, 0.3)"})
		  .from('.req__table', {duration: 1, xPercent: -20, opacity: 0, ease: "elastic.out(1, 0.3)"}, "<0.5")
		  .from('.req__title', {duration: 2, xPercent: -10, opacity: 0, ease: "elastic.out(1, 0.3)"}, "<")
		  .from('.req__text', {duration: 2, xPercent: -10, opacity: 0, ease: "elastic.out(1, 0.3)"}, "<0.2");
	}

	quotesSection() {
		this.timelineWithScrollTrigger('.quotes')
		  .from('.quotes h3.title, .quotes h2.title', {duration: 0.5, yPercent: 60, opacity: 0})
		  .from('.quotes__desc ', {duration: 0.5, yPercent: 60, opacity: 0}, "<0.2")
		  .from('.quotes .button', {duration: 0.5, yPercent: 60, opacity: 0}, "<0.2")
		  .from('.quotes__comm', {duration: 1, x: gsap.utils.random(200, 500), stagger: 0.2, opacity: 0, ease: "elastic.out(1, 0.3)"}, "0");
	}

	newsSection() {
		this.timelineWithScrollTrigger('.news')
		  .from('.news h3.title, .news h2.title', {duration: 0.5, xPercent: 50, opacity: 0})
		  .from('.news__text', {duration: 0.5, xPercent: 50, opacity: 0}, "<0.2")
		  .from('.news__form', {duration: 0.5, xPercent: 50, opacity: 0, onComplete: function () {
			gsap.set(this.targets(), { clearProps: "all" });
		  }}, "<0.2");
	}

	footerSection() {
		this.timelineWithScrollTrigger('.footer', 'center bottom')
		  .from('.footer__top', {duration: 0.6, yPercent: 50, opacity: 0})
		  .from('.footer__bottom', {duration: 0.6, yPercent: 50, opacity: 0}, "<0.3");
	}

	init() {
		this.mainSection();
		this.gallerySection();
		this.featuresSection();
		this.reqSection();
		this.quotesSection();
		this.newsSection();
		this.footerSection();
	}
}