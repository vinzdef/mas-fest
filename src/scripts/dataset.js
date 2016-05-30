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
		this.fillCopy(data['Copy'].elements)
		callback(this.artists)
	}

	getArtists(data) {
		return data['Artisti'].elements.map(a => {
			const image = `https://docs.google.com/uc?id=${a.image}`
			this.initImage(image)

			return {
				name: a.name,
				bio: a.bio,
				link: a.link,
				image,
				date: this.normalizeDate(a.date),
				time: a.time,
				slug: a.slug
			}
		})
	}

	fillCopy(copy) {
		copy.forEach(c => {
			if (c.name == 'frontiere') {
				$('#Tema > p').html(c.content)
			}
		})
	}

	initImage(url) {
		let img = new Image()
		img.src = url
	}

	normalizeDate(d) {
		let normalizedDate = d.split('/')
		const day = normalizedDate[0]
		normalizedDate[0] = normalizedDate[1]
		normalizedDate[1] = day
		return normalizedDate.join('/')
	}
}


