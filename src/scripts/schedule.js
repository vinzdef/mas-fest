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

	onDataReceived(data) {
		this.buildModels(data)
		this.fillSelect()
		this.reorder()

		this.stopLoading()
	}

	stopLoading() {
	//	TODO: Loading animation
		$('#Schedule').addClass('ready')
	}

	buildModels(data) {
		this.artists = []

		data.forEach(a => {
			this.artists.push({
				name: a.name,
				bio: a.bio,
				url: a.url,
				image: a.image || 'http://loremflickr.com/320/240',
				date: new Date(this.normalizeDate(a.date)),
				time: a.time
			})
		})

		this.artists.forEach(a => {
			const template = this.template.clone()
			template.find('.Artist_Name').text(a.name)
			template.find('.Artist_Hour').text(a.time)
			template.find('.Artist_Bio').text(a.bio)
			template.find('.Artist_Photo').css('background-image', `url(${a.image})`)
			a.template = template
		})
	}

	fillSelect() {
		let dates = []
		this.artists.forEach(a => {
			if (dates.indexOf(a.date) < 0) {
				dates.push(a.date)
			}
		})

		dates.forEach(date => {
			const d = new Date(this.normalizeDate(date))
			this.select.append(
				`<option
					value="${d.toLocaleDateString()}">
					${d.getDate()}
					${this.getMonth(d.getMonth())}</option>`)
		})
	}

	normalizeDate(d) {
		let normalizedDate = d.split('/')
		const day = normalizedDate[0]
		normalizedDate[0] = normalizedDate[1]
		normalizedDate[1] = day
		return normalizedDate.join('/')
	}

	getMonth(num) {
		const months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
		return months[num]
	}
}
