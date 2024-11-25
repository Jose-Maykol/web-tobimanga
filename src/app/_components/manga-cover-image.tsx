import { useEffect, useState } from 'react'

//TODO: Se puedo lograr con https://www.npmjs.com/package/react-intersection-observer

export default function MangaCoverImage({ src, alt }: { src: string; alt: string }) {
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const img = new Image()
		img.src = src
		img.onload = () => setIsLoading(false)
		console.log('img', isLoading)
	}, [src])

	if (isLoading) {
		return <div className='w-full h-full bg-muted-foreground' />
	}

	return <img src={src} alt={alt} loading='lazy' />
}
