import $ from 'jquery'

export default class Schedule {
	constructor() {
		this.artistWrapper = $('.Artist_Wrapper')
		this.template = $('.Artist.Template').remove().clone().removeClass('Template')

		this.select = $('#Schedule .DaySelect_Input')

		this.changeDate = this.changeDate.bind(this)
		this.doBindings()
	}

	doBindings() {
		this.select.change(this.changeDate)
	}

	changeDate() {
		const date = new Date(this.select.val())
		const currentArtists = this.artists.filter(a => {
			return a.date.toDateString() == date.toDateString()
		})

		this.artistWrapper.empty()
		currentArtists.forEach(a => {
			this.artistWrapper.append(a.template)
		})
	}

	onDataReceived(data) {
		this.data = data
		this.stopLoading()
		this.buildModels()
		this.fillDates()
		this.changeDate()
	}

	stopLoading() {
		$('#Schedule').addClass('ready')
	}

	buildModels() {
		this.artists = []
		this.artists = []

		this.data.forEach(a => {
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

	fillDates() {
		let dates = []
		this.data.forEach(a => {
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
		let day = normalizedDate[0]
		normalizedDate[0] = normalizedDate[1]
		normalizedDate[1] = day
		return normalizedDate.join('/')
	}

	getMonth(num) {
		let months = ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre']
		return months[num]
	}
}