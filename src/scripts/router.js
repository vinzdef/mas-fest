import $ from 'jquery'
import { createHistory } from 'history'

export default class Router {
	constructor() {
		$(document).on('click',
						'a.internal',
						this.onNavigation.bind(this))

		this.beacons = $('[data-route]')
	}

	onNavigation(state) {
		debugger
		console.log('[ROUTER] Navigation', arguments)

		Array.prototype.forEach.call(this.beacons, b => {
			if (this.testPath(path, b.dataset['route'])) {
				$('html, body').animate({
					scrollTop: $(b).offset().top
				}, 300)
			}
		})

		return false
	}

	testPath(path, url) {
		return path == $(`<a href=${url} />`).pathname
	}
}
