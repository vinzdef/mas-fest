import $ from 'jquery'

export default class ScrollHandler {
	constructor() {
		this.onScroll = this.onScroll.bind(this)
		this.beacons = $('[data-route]')
		$(window).on('mousewheel', this.onScroll)
	}

	onScroll(e) {
		const bodyTop = $('body').scrollTop()
		let target = null

		this.beacons.each(function () {
			const top = $(this).offset().top
			const bottom = $(this).offset().top + $(this).height()

			if (top <= bodyTop)  {
				target = this
			}
		})

		if (target) {
			$(window).trigger('MAS:replace-state', { pathname: target.dataset['route'] })
		}
	}
}
