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
		if (state.action == 'REPLACE' || state.pathname == this.prevPath) {
			this.prevPath = state.pathname
			return
		}


		$(window).trigger('MAS:state-change', { pathname: state.pathname })

		Array.prototype.forEach.call(this.beacons, b => {
			if (this.testPath(state.pathname, b.dataset['route'])) {
				$('html, body').animate({
					scrollTop: $(b).offset().top
				}, 300)
			}
		})
	}

	testPath(path, url) {
		return path == $(`<a href="${url}" />`)[0].pathname
	}
}
