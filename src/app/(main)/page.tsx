'use client'

import { useQuery } from '@tanstack/react-query'
import Loader from '../_components/loader/loader'
import { Paginated } from '@/types/pagination'
import { Manga } from '@/types/manga'
import MangaService from '@/services/api/manga-service'
import MangaCard from '../_components/manga-card'

export default function HomePage() {
	const { isPending, isError, data } = useQuery<Paginated<Manga>>({
		queryKey: ['mangas'],
		queryFn: async () => {
			return await MangaService.getByPage({ page: 1, limit: 10 })
		}
	})

	if (isPending && !data) {
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
					<MangaCard
						key={manga.id}
						manga={{
							id: manga.id,
							slug: manga.slug,
							title: manga.title,
							coverImage: manga.coverImage,
							chapters: manga.chapters,
							rating: manga.rating
						}}
					/>
				))}
			</div>
		</section>
	)
}
