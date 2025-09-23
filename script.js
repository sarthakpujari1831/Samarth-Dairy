document.addEventListener('DOMContentLoaded', function () {
	const header = document.getElementById('header');
	const navToggle = document.querySelector('.nav__toggle');
	const navList = document.getElementById('primary-menu');

	let lastScrollTop = 0;
	window.addEventListener('scroll', () => {
		const st = window.pageYOffset || document.documentElement.scrollTop;
		if (st > 10) {
			header.classList.add('is-scrolled');
		} else {
			header.classList.remove('is-scrolled');
		}
		lastScrollTop = st <= 0 ? 0 : st;
	}, { passive: true });

	if (navToggle && navList) {
		navToggle.addEventListener('click', () => {
			const isOpen = navList.classList.toggle('is-open');
			navToggle.setAttribute('aria-expanded', String(isOpen));
		});
		// Close on link click (mobile)
		navList.querySelectorAll('a').forEach(a => {
			a.addEventListener('click', () => {
				navList.classList.remove('is-open');
				navToggle.setAttribute('aria-expanded', 'false');
			});
		});
	}

	const slider = document.querySelector('[data-slider]');
	if (slider) {
		const track = slider.querySelector('[data-track]');
		const prev = slider.querySelector('[data-prev]');
		const next = slider.querySelector('[data-next]');
		let index = 0;
		const total = track.children.length;

		function goTo(i) {
			index = (i + total) % total;
			track.scrollTo({ left: track.clientWidth * index, behavior: 'smooth' });
		}

		prev.addEventListener('click', () => goTo(index - 1));
		next.addEventListener('click', () => goTo(index + 1));

		let auto = setInterval(() => goTo(index + 1), 5000);
		slider.addEventListener('mouseenter', () => clearInterval(auto));
		slider.addEventListener('mouseleave', () => auto = setInterval(() => goTo(index + 1), 5000));

		window.addEventListener('resize', () => goTo(index));
	}
});