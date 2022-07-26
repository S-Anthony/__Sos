import Translation from "./modules/translation";
import Request from "./services/requests";
import Button from "./modules/button";
import Form from "./modules/form";
import InputValidator from "./modules/inputValidation";
import Swiper, { Navigation, Pagination, EffectCards } from 'swiper';

document.querySelectorAll('[data-click-close]').forEach(item => {
	item.addEventListener('click', () => {
		item.style.display='none';
	});
})

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
	  nextEl: '.gallery__arrow_next', // default: swiper-button-next custom: gallery__arrow_next
	  prevEl: '.gallery__arrow_prev', // default: swiper-button-prev custom: gallery__arrow_prev
	  disabledClass: 'gallery__arrow_disabled'
	},
	pagination: {
		el: '.gallery__index',
		clickable: true,
		bulletActiveClass: 'active'
	},
	slideActiveClass: 'swiper-slide-active', // default: swiper-slide-active custom: gallery__slide_active
	slideClass: 'swiper-slide', // default: swiper-slide custom: gallery__slide
	wrapperClass: 'swiper-wrapper', // default: swiper-wrapper custom: gallery__slides
	slidesPerView: 1.13,
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

new Form({input: '.news__form input', button: '.button.button_form', form: '.news__form', url: './server.php', okModal: '.modal_ok', failModal: '.modal_fail', buttonLoadingClass: 'button_form_loading', formDisableClass: 'news__form_disabled'}).init();

new InputValidator('.news__form input', '.button.button_form').init();