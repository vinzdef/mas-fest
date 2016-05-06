import $ from 'jquery'

export default class ArtistPopup {
	constructor() {
		this.element = $('#ArtistPopup')
		this.element.click(({ target }) => {
			if (this.element.is(target)) {
				$(window).trigger('MAS:push-state', { pathname: '/scheudle' })
			}
		})
	}

	open() {
		this.element.addClass('open')
		this.isOpen = true
	}

	close() {
		this.element.removeClass('open')
		this.isOpen = false
	}

	fill(artistModel) {
		this.element.find('.Image').css('background-image', `url(${artistModel.image})`)
		this.element.find('.Bio').text(artistModel.bio)
		this.element.find('.Name').text(artistModel.name)
	}
}
