import $ from 'jquery'

export default class ScrollHandler {
	constructor() {
		this.onScroll = this.onScroll.bind(this)
		$(window).on('mousewheel', this.onScroll)
	}

	onScroll(e) {
		if ($(window).scrollTop() == 0 && e.originalEvent.deltaY > 0) {
			$('html, body').animate({
				scrollTop: $('#Schedule').offset().top
			}, 350)
			return false
		}
	}
}
