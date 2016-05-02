import $ from 'jquery'
import Tabletop from 'tabletop'

export default class Dataset {
	constructor() {
		this.onDataReceived = this.onDataReceived.bind(this)
	}

	fetch(spritesheet) {
		Tabletop.init({
			key: spritesheet,
			callback: this.onDataReceived,
			simpleSheet: false
		})
	}

	onDataReceived(data) {
		this.data = data
		$(window).trigger('MAS:data-received', data)
	}
}


