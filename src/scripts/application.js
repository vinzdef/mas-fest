import $ from 'jquery'

import Router from './router'
import Dataset from './dataset'
import Schedule from './schedule'
import ScrollHandler from './scroll-handler'
import ArtistPopup from './artist-popup'
import Menu from './menu'

import { lockScroll, unlockScroll } from './utils'

const CONFIG = {
	sheet: '1Yl__5rUf9nF6x023tbutUusBqV9KX44ihrw2E16AqBU'
}

export default class Application {
	constructor() {
		this.loading = $('#Loader')
		lockScroll()

		this.schedule = new Schedule()
		this.artistPopup = new ArtistPopup()

		this.router = new Router()
		this.scrollHandler = new ScrollHandler()
		this.menu = new Menu()

		this.dataset = new Dataset()
		this.dataset.fetch(CONFIG.sheet, this.onDataRecevied.bind(this))
	}

	onDataRecevied(artists) {
		this.schedule.onDataReceived(artists)
		this.artistPopup.onDataReceived(artists)

		this.dataLoaded = true
		this.imagesLoaded = true
		this.checkLoading()
	}

	checkLoading() {
		if (this.dataLoaded && this.imagesLoaded) {
			this.loading.fadeOut()
			unlockScroll()
		}
	}
}
