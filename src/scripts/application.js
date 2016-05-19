export default class Application {
	constructor() {
		this.avatar = document.querySelector('.Avatar.Cursor')
		window.addEventListener('mousemove', this.onMove.bind(this))
		window.addEventListener('touchmove', this.onMove.bind(this))

		document.addEventListener('mouseover', e => {
			console.log(e.path[0].tagName)
			if (e.path[0].tagName == 'A') {
				this.avatar.classList.add('hover')
			} else {
				this.avatar.classList.remove('hover')
			}
		})
	}

	onMove(e) {
		const x = typeof e.clientX === 'undefined' ? e.touches[0].screenX : e.clientX
		const y = typeof e.clientY === 'undefined' ? e.touches[0].screenY : e.clientY

		this.avatar.style.transform = `translate3d(calc(${x}px - 50px), calc(${y}px - 50px), 0.001px)`
	}
}
