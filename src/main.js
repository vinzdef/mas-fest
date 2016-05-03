import Styles from './styles/main'
import $ from 'jquery'

import Application from './scripts/application'

$(function() {
	window.MAS = new Application()
	window.$ = $
})
