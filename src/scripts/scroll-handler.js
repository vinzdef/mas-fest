import $ from 'jquery'

export default class ScrollHandler {
	constructor() {
		this.beacons = $('[data-route]')
		$(window).on('scroll', this.onScroll.bind(this))
	}

	onScroll(e) {
		if (window.isFakeScroll) {
			return
		}

		const bodyTop = $('body').scrollTop()
		let target = null

		this.beacons.each((i, el) => {
			const top = $(el).offset().top
			const bottom = $(el).offset().top + $(el).height()

			if (top <= bodyTop) {
				target = el
			}
		})

		if (target) {
			$(window).trigger('MAS:replace-state', { pathname: target.dataset['route'] })
		}
	}
}
