import $ from 'jquery'
import Tabletop from 'tabletop'

export default class Dataset {

	fetch(spritesheet, callback) {
		Tabletop.init({
			key: spritesheet,
			callback: (data) => this.onDataReceived(data, callback),
			simpleSheet: false
		})
	}

	onDataReceived(data, callback) {
		this.data = data
		this.artists = this.getArtists(data)
		callback(this.artists)
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


