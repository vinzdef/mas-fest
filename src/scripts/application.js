export default class Application {
	constructor() {
		this.avatar = document.querySelector('.Avatar')
		//this.avatarWidth =
		window.addEventListener('mousemove', this.onMove.bind(this))
	}

	onMove(e) {
		const x = e.clientX
		const y = e.clientY

		this.avatar.style.top = x + 'px'
		this.avatar.style.left = y + 'px'
	}
}
