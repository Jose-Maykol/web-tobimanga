/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { useState } from 'react'

interface MangaCardProps {
	manga: {
		id: string
		slug: string
		title: string
		coverImage: string
		chapters: number
		rating: number
	}
}

export default function MangaCard({ manga }: MangaCardProps) {
	const [imageLoaded, setImageLoaded] = useState(false)

	const handleImageLoad = () => {
		setImageLoaded(true)
	}

	return (
		<Link
			key={manga.id}
			className='w-72 relative'
			draggable='false'
			href='/manga/[slug]'
			as={`/manga/${manga.slug}`}
		>
			<div className='relative w-full aspect-[96/151] bg-neutral-200 rounded-md overflow-hidden'>
				{!imageLoaded && (
					<div className='absolute inset-0 w-72 bg-gray-200 rounded-md animate-pulse'></div>
				)}

				<img
					src={manga.coverImage}
					alt={manga.title}
					className='w-72 h-full select-none pointer-events-none object-cover absolute inset-0'
					onLoad={handleImageLoad}
				/>
			</div>

			<div className='p-2 absolute bottom-0 left-0 right-0 h-32 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent'>
				<h2 className='font-bold select-all'>{manga.title}</h2>
				<p className='select-all'>Capitulo {manga.chapters}</p>
			</div>
			<div className='absolute top-2 left-2 bg-primary text-white font-bold rounded-md w-10 h-10 flex items-center justify-center'>
				{manga.rating}
			</div>
		</Link>
	)
}
