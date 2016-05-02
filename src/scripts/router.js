import $ from 'jquery'

export default class Router {
	constructor() {

		this.onNavigation = this.onNavigation.bind(this)
		this.doBindings()
	}

	doBindings() {
		$(document).on('click', 'a.internal', this.onNavigation)
	}

	onNavigation() {
		console.log('[ROUTER] Navigation', arguments)
		return false
	}
}
