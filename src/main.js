import Styles from './styles/main'
import Application from './scripts/application'

export default function main() {
	window.MAS = new Application()
}

window.onload = main
