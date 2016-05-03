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
		$(window).trigger('MAS:data-received', data)
	}
}


