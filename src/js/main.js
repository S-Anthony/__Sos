import Translation from "./modules/translation";
import Request from "./services/requests";
import Button from "./modules/button";
import Form from "./modules/form";
import InputValidator from "./modules/inputValidation";
import Swiper, { Navigation, Pagination, EffectCards } from 'swiper'; 
import Scroller from "./modules/scroll";
import Animations from "./modules/gsapAnimations";
import Accordion from "./modules/accordion";

document.addEventListener("DOMContentLoaded", () => {
	'use strict';

	new Request().getResources('./translation.json')
	.then(res => {
		new Translation(res, 'header__lang', 'data-lang', '.modal_loading').init();
	})
	.catch((e) => {});

	new Button({btnSelector: '.main__down', btnToggleClass: 'main__down_hidden'}).init();
	new Button({btnSelector: '.header__burger', additionalSelector: '.header', additionalToggleClass: 'mobile-menu'}).init();
	const swiper = new Swiper('.gallery__slider-wrapper', {
		modules: [Navigation, Pagination, EffectCards],
		loop: false,
		effect: 'cards',
		cardsEffect: {
			rotate: false
		},
		navigation: {
		nextEl: '.gallery__arrow_next',
		prevEl: '.gallery__arrow_prev',
		disabledClass: 'gallery__arrow_disabled'
		},
		pagination: {
			el: '.gallery__index',
			clickable: true,
			bulletActiveClass: 'active'
		},
		slideActiveClass: 'swiper-slide-active',
		slideClass: 'swiper-slide',
		wrapperClass: 'swiper-wrapper',
		slidesPerView: 1,
		watchSlidesProgress: true,
	});

	swiper.on('slideChange', function () {
		let preActive = true;
		document.querySelectorAll('.gallery__index span').forEach(bullet => {
			if (bullet.classList.contains('active')) {
				preActive = false;
			}
			if(preActive) {
				bullet.classList.add('pre-active');
			} else {
				bullet.classList.remove('pre-active');
			}
		});
	});

	new Form({input: '.news__form input', button: '.button.button_form', form: '.news__form', url: './server.php', buttonLoadingClass: 'button_form_loading', formDisableClass: 'news__form_disabled'}).init();

	new InputValidator('.news__form input', '.button.button_form').init();
	new Scroller('[data-anchor]').init();
	new Animations().init();
	new Accordion('.features__accordion', '.features__item', 'accordion_active', 'accordion_pre-active').init();
});