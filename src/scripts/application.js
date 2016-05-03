import $ from 'jquery'

import Router from './router'
import Dataset from './dataset'
import Schedule from './schedule'
import ScrollHandler from './scroll-handler'
import Menu from './menu'

export default class Application {
	constructor() {
		this.router = new Router()
		this.scrollHandler = new ScrollHandler()
		this.menu = new Menu()

		this.dataset = new Dataset()
		this.dataset.fetch('1Yl__5rUf9nF6x023tbutUusBqV9KX44ihrw2E16AqBU')
		this.schedule = new Schedule()

		this.onDataReceived = this.onDataReceived.bind(this)
		$(window).on('MAS:data-received', this.onDataReceived)
	}

	onDataReceived(e, data) {
		this.schedule.onDataReceived(data['Artisti'].elements)
	}
}
