import $ from 'jquery'
import Tabletop from 'tabletop'

export default class Dataset {

	fetch(spritesheet) {
		Tabletop.init({
			key: spritesheet,
			callback: (data) => this.onDataReceived(data),
			simpleSheet: false
		})
	}

	onDataReceived(data) {
		this.data = data
		this.artists = this.getArtists(data)
		$(window).trigger('MAS:data-received', { artists: this.artists })
	}

	getArtists(data) {
		return data['Artisti'].elements.map(a => {
			return {
				name: a.name,
				bio: a.bio,
				url: a.url,
				image: a.image || 'http://loremflickr.com/320/240',
				date: this.normalizeDate(a.date),
				time: a.time,
				slug: a.slug
			}
		})
	}

	normalizeDate(d) {
		let normalizedDate = d.split('/')
		const day = normalizedDate[0]
		normalizedDate[0] = normalizedDate[1]
		normalizedDate[1] = day
		return normalizedDate.join('/')
	}
}


