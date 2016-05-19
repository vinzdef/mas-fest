import $ from 'jquery'

import { lockScroll, unlockScroll } from './utils'

export default class ArtistPopup {
	constructor() {
		this.element = $('#ArtistPopup')
		this.element.click(({ target }) => {
			if (this.element.is(target)) {
				$(window).trigger('MAS:push-state', { pathname: '/scheudle' })
			}
		})

		$(window).on('MAS:popup-open', this.open.bind(this))
		$(window).on('MAS:popup-close', this.close.bind(this))
	}

	open(e, { slug }) {
		if (!this.dataReady) {
			this.element.one('MAS:popup-data-ready', () => this.open(e, { slug }))
			return
		}

		const artist = this.artists.filter(a => a.slug == slug)[0]
		this.fill(artist)

		lockScroll()
		this.element.addClass('open')
		this.isOpen = true
	}

	onDataReceived(artists) {
		this.dataReady = true
		this.artists = artists
		this.element.trigger('MAS:popup-data-ready')
	}

	close() {
		unlockScroll()
		this.element.removeClass('open')
		this.isOpen = false
	}

	fill(artistModel) {
		this.element.find('.Image').css('background-image', `url(${artistModel.image})`)
		this.element.find('.Bio').text(artistModel.bio)
		this.element.find('.Name').text(artistModel.name)
	}
}
