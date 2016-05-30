import $ from 'jquery'

export default class Map {
	constructor() {
		this.el = $('.Location .Map')
		this.locationAnchor = $('.Location .MapAnchor')

		this.marker = new google.maps.Marker({
			position: {lat: 40.911979, lng: 14.806665},
			title: 'Parco Urbano Santo Spirito, Avellino'
		})

		this.map = new google.maps.Map(this.el[0], {
			center: {lat: 40.914525, lng: 14.803951},
			mapTypeControl: false,
			scaleControl: false,
			zoomControl: false,
			streetViewControl: false,
			rotateControl: false,
			fullscreenControl: false,
			draggable: false,
			scrollwheel: false,
			panControl: false,
			minZoom: 16,
			maxZoom: 16,
			zoom: 16
		})

		this.marker.setMap(this.map)

		this.el.click(() => {
			console.log(this.locationAnchor[0])
			this.locationAnchor[0].click()
		})
	}
}
