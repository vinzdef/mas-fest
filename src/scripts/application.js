import $ from 'jquery'

import Router from './router'
import Dataset from './dataset'
import Schedule from './schedule'
import ScrollHandler from './scroll-handler'
import ArtistPopup from './artist-popup'
import Menu from './menu'
import Map from './map'

import makeVideoPlayableInline from './vendors/iphone-inline-video'

import { lockScroll, unlockScroll } from './utils'

const CONFIG = {
	sheet: '1Yl__5rUf9nF6x023tbutUusBqV9KX44ihrw2E16AqBU'
}

export default class Application {
	constructor() {

		window.initMap = () => { this.map = new Map() }
		$('body').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBAsezQtZsttrVU7YXEU8-ztk0Lm8T2jBQ&callback=initMap" async defer></script>')

		if (!this.isWebmSupported()) {
			$('html').addClass('low-pink')
		}

		const $avatar = $('#Loader .Avatar')
		$avatar.ready(() => {
			$avatar.addClass('ready')
		})

		this.loading = $('#Loader')
		lockScroll()

		this.schedule = new Schedule()
		this.artistPopup = new ArtistPopup()

		this.dataset = new Dataset()
		this.dataset.fetch(CONFIG.sheet, this.onDataRecevied.bind(this))

		this.initVideos()

		if (navigator.userAgent.indexOf('iPhone') >= 0 || navigator.userAgent.indexOf('iPad') >= 0) {
			$('html').addClass('ithing')
		}
	}

	isWebmSupported() {
		return $('video').get(0).canPlayType('video/webm; codecs="vp8, vorbis"') !== ''
	}

	initVideos() {
		$('video').get().forEach(el => {
			makeVideoPlayableInline(el, false)
		})

		$('video').ready(() => this.onMediaLoaded())
	}


	onDataRecevied(artists) {
		this.schedule.onDataReceived(artists)
		this.artistPopup.onDataReceived(artists)

		this.dataLoaded = true
		this.checkLoading()
	}

	onMediaLoaded() {

		this.imagesLoaded = true
		this.checkLoading()
	}

	checkLoading() {
		if (this.dataLoaded && this.imagesLoaded) {
			this.loading.fadeOut()
			unlockScroll()

			this.router = new Router()
			this.scrollHandler = new ScrollHandler()
			this.menu = new Menu()
		}
	}
}
