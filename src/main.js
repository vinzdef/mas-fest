import Styles from './styles/main'
import $ from 'jquery'

import Application from './scripts/application'

$(function() {
	setTimeout(
		() => window.MAS = new Application()
		, 300
	)
	window.$ = $
})
