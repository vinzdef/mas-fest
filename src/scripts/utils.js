import $ from 'jquery'

export function lockScroll(e) {
	const currentScroll = window.scrollY
	$('html').addClass('scroll-lock')
	window.scrollTo(0, currentScroll)
}

export function unlockScroll(e) {
	$('html').removeClass('scroll-lock')
}
