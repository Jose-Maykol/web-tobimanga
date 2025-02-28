'use client'

import { useQuery } from '@tanstack/react-query'
import Loader from '../_components/loader/loader'
import Link from 'next/link'
/* import MangaCoverImage from '../_components/manga-cover-image' */
import { Paginated } from '@/types/pagination'
import { Manga } from '@/types/manga'
import MangaService from '@/services/api/manga-service'

export default function HomePage() {
	const { isPending, isError, data } = useQuery<Paginated<Manga>>({
		queryKey: ['mangas'],
		queryFn: async () => {
			return await MangaService.getByPage({ page: 1, limit: 10 })
		}
	})

	if (isPending) {
		return (
			<div
				className='flex w-full items-center justify-center'
				style={{ height: 'calc(100vh - 96px)' }}
			>
				<Loader />
			</div>
		)
	}

	if (isError || !data) {
		return <div>Error</div>
	}

	return (
		<section className='flex flex-col w-full items-center p-4 mt-16'>
			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center'>
				{data.items.map((manga) => (
					<Link
						key={manga.id}
						className='w-72 relative'
						draggable='false'
						href='/manga/[slug]'
						as={`/manga/${manga.slug}`}
					>
						{/* <MangaCoverImage src={manga.coverImage} alt={manga.title} /> */}
						<img
							src={manga.coverImage}
							alt={manga.title}
							className='w-72 select-none pointer-events-none'
						/>
						<div className='p-2 absolute bottom-0 left-0 right-0 h-32 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/60 to-transparent'>
							<h2 className='font-bold select-all'>{manga.title}</h2>
							<p className='select-all'>Capitulo {manga.chapters}</p>
						</div>
						<div className='absolute top-2 left-2 bg-primary text-white font-bold rounded-md w-10 h-10 flex items-center justify-center'>
							{manga.rating}
						</div>
					</Link>
				))}
			</div>
		</section>
	)
}
