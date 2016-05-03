import $ from 'jquery'

export default class Menu {
	constructor() {
		this.menu = $('#Menu')
		this.toggle = $('.Menu_Toggle')
		this.toggle.click(() => this.toggleMenu())

		this.menu.find('.Menu_Link').click(() => this.close())
		$(window).on('MAS:state-change', this.onRouteChange.bind(this))
		this.onRouteChange(null, {pathname: window.location.pathname})
	}

	onRouteChange(e, { pathname }) {
		this.menu
			.find('.Menu_Link')
			.removeClass('active')
			.each(function() {
				if (this.pathname == pathname) {
					$(this).addClass('active')
				}
			})

	}

	toggleMenu() {
		if (this.isOpen) {
			this.close()
		} else {
			this.open()
		}
	}

	close() {
		this.menu.removeClass('open')
		this.isOpen = false
	}

	open() {
		this.menu.addClass('open')
		this.isOpen = true
	}
}
