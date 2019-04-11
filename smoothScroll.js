(document.addEventListener('DOMContentLoaded', function() {
	let links = document.getElementsByTagName('a');
	if (!links) return false;

	Array.prototype.forEach.call(links, a => {
		let href = a.getAttribute('href');

		if (href && href.indexOf('#') != -1) a.addEventListener('click', event => {
			let hash = event.target.hash;

			if (hash) {
				let to = document.querySelector(hash);

				if (to) {
					let toPos = to.offsetTop;

					if (toPos > 0) {
						event.preventDefault();

						let smoothScroll = function() {
								let speed = 10,
									scrollPos = window.pageYOffset || window.scrollY,
									scrollHeight = Math.max(
										document.body.scrollHeight, document.documentElement.scrollHeight,
										document.body.offsetHeight, document.documentElement.offsetHeight,
										document.body.clientHeight, document.documentElement.clientHeight
									),
									dir = (toPos < scrollPos ? -1 : 1);

								if ((scrollPos + 1) >= (scrollHeight - innerHeight)) dir = -1;

								let dif = (dir > 0 ? (toPos % scrollPos) : (scrollPos % toPos));

								if ((dir > 0 && scrollPos > (toPos - speed)) ||
									(dir < 0 && scrollPos < (toPos + speed))) {
									window.scrollTo(0, scrollPos + (dif * dir));
									window.location.href = hash;
									return true;
								}

								window.scrollTo(0, scrollPos + (speed * dir));

								setTimeout(smoothScroll, 1);
							};

						if (smoothScroll()) return true;
					}
				}
			}
		});
	});
}));