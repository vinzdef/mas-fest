import $ from 'jquery'

import Router from './router'
import Dataset from './dataset'
import Schedule from './schedule'
import ScrollHandler from './scroll-handler'
import ArtistPopup from './artist-popup'
import Menu from './menu'

export default class Application {
	constructor() {
		this.openPopup = this.openPopup.bind(this)
		this.closePopup = this.closePopup.bind(this)
		this.onDataReceived = this.onDataReceived.bind(this)
		$(window).on('MAS:data-received', this.onDataReceived)
		$(window).on('MAS:popup-open', this.openPopup)
		$(window).on('MAS:popup-close', this.closePopup)

		this.router = new Router()
		this.scrollHandler = new ScrollHandler()
		this.menu = new Menu()

		this.dataset = new Dataset()
		this.dataset.fetch('1Yl__5rUf9nF6x023tbutUusBqV9KX44ihrw2E16AqBU')

		this.schedule = new Schedule()
		this.artistPopup = new ArtistPopup()


	}

	onDataReceived(e, { artists }) {
		this.schedule.onDataReceived(artists)
		this.dataReady = true
		$(window).trigger('MAS:data-ready')
	}

	openPopup(e, { slug }) {
		if (!this.dataReady) {
			$(window).one('MAS:data-ready', () => this.openPopup(e, { slug }))
			//this.artistPopup.loading()
			return
		}
		const artist = this.dataset.artists.filter(a => a.slug == slug)[0]
		this.artistPopup.fill(artist)
		this.artistPopup.open()
		this.lockScroll()
	}

	closePopup() {
		this.artistPopup.close()
		this.unlockScroll()
	}

	lockScroll(e) {
		const currentScroll = window.scrollY
		$('html').addClass('scroll-lock')
		window.scrollTo(0, currentScroll)
	}

	unlockScroll(e) {
		$('html').removeClass('scroll-lock')
	}
}
