export default class Application {
	constructor() {
		this.avatar = document.querySelector('.Avatar')
		//this.avatarWidth =
		window.addEventListener('mousemove', this.onMove.bind(this))
		window.addEventListener('touchmove', this.onMove.bind(this))
	}

	onMove(e) {
		const x = typeof(e.clientX) === 'undefined' ? e.touches[0].screenX : e.clientX
		const y = typeof(e.clientY) === 'undefined' ? e.touches[0].screenY : e.clientY

		this.avatar.style.transform = `translate3d(calc(${x}px - 50%), calc(${y}px - 50%), 0.001px)`
	}
}
