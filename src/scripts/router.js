import $ from 'jquery'
import { createHistory } from 'history'

export default class Router {
	constructor() {
		this.history = createHistory()

		this.beacons = $('[data-route]')

		this.historyListener = this.history.listen(this.onStateChange.bind(this))
		$(document).on('click', 'a.internal', this.onNavigation.bind(this))
		$(window).on('MAS:replace-state', (e, { pathname }) => {
			this.history.replace(pathname)
		})
		$(window).on('MAS:push-state', (e, { pathname }) => {
			this.history.push(pathname)
		})
	}

	onNavigation(e) {
		const a = e.currentTarget
		this.history.push({
			pathname: a.pathname
		})
		return false
	}

	onStateChange(state) {
		if (this.prevPath == state.pathname) {
			return
		}

		this.prevPath = state.pathname
		$(window).trigger('MAS:state-change', { pathname: state.pathname })

		if (state.action == 'REPLACE') {
			return
		}

		Array.prototype.forEach.call(this.beacons, b => {
			if (this.testPath(state.pathname, b.dataset['route'])) {
				window.isFakeScroll = true
				$('html, body').animate({
					scrollTop: $(b).offset().top
				}, 300, () => {
					window.isFakeScroll = false
				})
			}
		})
	}

	testPath(path, url) {
		return path == $(`<a href="${url}" />`)[0].pathname
	}
}
