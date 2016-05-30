import $ from 'jquery'

export default class Schedule {
	constructor() {
		this.artistWrapper = $('.Artist_Wrapper')
		this.template = $('.Artist.Template').remove().clone().removeClass('Template')

		this.select = $('#Schedule .DaySelect_Input')

		this.reorder = this.reorder.bind(this)
		this.doBindings()
	}

	doBindings() {
		this.select.change(this.reorder)
	}

	reorder() {
		const targetDate = new Date(this.select.val())
		const currentArtists = this.artists.filter(a => {
			let artistDate = new Date(a.date)
			return artistDate.toDateString() == targetDate.toDateString()
		})

	//	TODO: Animate transition!
		this.artistWrapper.empty()
		currentArtists.forEach(a => {
			this.artistWrapper.append(a.template)
		})
	}

	onDataReceived(artists) {
		this.artists = artists
		this.buildModels(artists)
		this.fillSelect(artists)
		this.reorder()

		this.stopLoading()
	}

	stopLoading() {
	//	TODO: Loading animation
		$('#Schedule').addClass('ready')
	}

	buildModels(artists) {
		artists.forEach(a => {
			const template = this.template.clone()
			template.find('.Artist_Name').text(a.name)
			template.find('.Artist_Hour').text(a.time)
			template.find('.Artist_Bio').text(a.bio)
			template.find('.Artist_Photo').css('background-image', `url(${a.image})`)
			template.attr('href', `artisti/${a.slug}`)
			a.template = template
		})
	}

	fillSelect(artists) {
		let dates = []
		artists.forEach(a => {
			if (dates.indexOf(a.date) < 0) {
				dates.push(a.date)
			}
		})

		dates.forEach(date => {
			const d = new Date(date)
			this.select.append(
				`<option
					value="${d.toString()}">
					${d.getDate()}
					${this.getMonth(d.getMonth())}</option>`)
		})
	}

	getMonth(num) {
		const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
		return months[num]
	}
}
