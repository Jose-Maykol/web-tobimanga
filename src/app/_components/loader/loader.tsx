import styles from './loader.module.css'

export default function Loader() {
	return (
		<svg className={styles.container}>
			<rect className={styles.boxes}></rect>
		</svg>
	)
}
