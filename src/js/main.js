"use strict";

// меню
const menu = document.querySelector('.nav'),
	burger = document.querySelector('.burger'),
	overlay = document.querySelector('.overlay'),
	body = document.body;


burger.addEventListener('click', () => {
	menu.classList.toggle('opened');
	overlay.classList.toggle('visible');
	burger.classList.toggle('opened');
	burger.setAttribute('aria-expanded', burger.classList.contains('opened'));
	body.classList.toggle('lock');
});

overlay.addEventListener('click', () => {
	menu.classList.remove('opened');
	overlay.classList.remove('visible');
	burger.classList.remove('opened');
	body.classList.remove('lock');
});

// счетчик
for (let i of document.querySelectorAll(".number")) {

	let numberTop = i.getBoundingClientRect().top,
		start = +i.innerHTML,
		end = +i.dataset.max;

	let interval = this.setInterval(function () {
		i.innerHTML = ++start;
		if (start == end) {
			clearInterval(interval);
		}
	}, 55);
}

// анимация при скролле
const animItems = document.querySelectorAll(".animated");

if (animItems.length > 0) {
	window.addEventListener("scroll", animOnScroll);
	function animOnScroll() {
		for (let index = 0; index < animItems.length; index++) {
			const animItem = animItems[index];
			const animItemHeight = animItem.offsetHeight;
			const animItemOffset = offset(animItem).top;
			const animStart = 8;

			let animItemPoint = window.innerHeight - animItemHeight / animStart;
			if (animItemHeight > window.innerHeight) {
				animItemPoint = window.innerHeight - window.innerHeight / animStart;
			}

			if (pageYOffset > animItemOffset - animItemPoint && pageYOffset < animItemOffset + animItemHeight) {
				animItem.classList.add("active");
			} else {
				if (!animItem.classList.contains("animated-visible")) {
					animItem.classList.remove("active");
				}
			}
		}
	}
	function offset(el) {
		const rect = el.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop;
		return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
	}

	setTimeout(() => {
		animOnScroll();
	}, 300);
}


// fancybox
$(document).ready(function () {
	$('[data-src="form"]').fancybox({
		src: '#form',
		touch: false,
		scrolling: 'hidden',
		toolbar: false,
		lang: "ru"
	})
});

// яндекс карта
let center = [55.814634569962315, 37.38576113373838];

function getYaMap() {
	let map = new ymaps.Map('map', {
		center: center,
		zoom: 16
	});

	let placemark = new ymaps.Placemark(center, {
		balloonContentHeader: 'RentSoft',
		balloonContentBody: 'МО, Красногорский район, г. Красногорск, бульвар Строителей, д. 4, корп. 1',
		balloonContentFooter: '<a href="tel:74956685021">+7 (495) 668-50-21</a><br><a href="mailto:office@rentsoft.ru">office@rentsoft.ru</a>'
	}, {
		iconLayout: 'default#image',
		iconImageHref: 'images/placemark.svg',
		iconImageSize: [45, 45],
		iconImageOffset: [-19, -24]
	});

	map.controls.remove('geolocationControl'); // удаляем геолокацию
	map.controls.remove('searchControl'); // удаляем поиск
	map.controls.remove('trafficControl'); // удаляем контроль трафика
	map.controls.remove('typeSelector'); // удаляем тип
	map.controls.remove('fullscreenControl'); // удаляем кнопку перехода в полноэкранный режим
	map.controls.remove('rulerControl'); // удаляем контрол правил
	map.geoObjects.add(placemark);
}

// inputmask
const form = document.querySelector('.form');
const telSelector = form.querySelector('input[type="tel"]');
const inputMask = new Inputmask('+7 (999) 999-99-99');

inputMask.mask(telSelector);

// just-validate
new window.JustValidate('.form', {
	rules: {
		tel: {
			required: true,
			function: () => {
				// передаем чистое значение ввода
				const phone = telSelector.inputmask.unmaskedvalue();
				return Number(phone) && phone.length === 10;
			}
		},
		task: {
			required: true,
		}
	},
	colorWrong: 'var(--color-red)',
	messages: {
		name: {
			required: 'Введите имя',
			minLength: 'Имя не должно быть меньше 3 символов',
			maxLength: 'Имя не должно содержать более 15 символов'
		},
		email: {
			email: 'Введите корректный E-mail',
			required: 'Введите E-mail'
		},
		tel: {
			required: 'Введите телефон',
			function: 'Введите корректный телефон'
		},
		task: {
			required: 'Опишите задачу'
		}
	},
	submitHandler: function (thisForm) {

	}
})