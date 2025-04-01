import { useInfiniteQuery } from '@tanstack/react-query'
import ChapterCard from './chapter-card'
import { Chapter } from '@/types/chapter'
import { useEffect, useRef } from 'react'
import MangaService from '@/services/api/manga-service'
import { useAuthStore } from '@/app/stores/auth-store'
import UserMangaService from '@/services/api/user-manga-service'

interface ChaptersListProps {
	mangaId: string
}

export default function ChaptersList({ mangaId }: ChaptersListProps) {
	const { isAuthenticated } = useAuthStore()
	const { data, fetchNextPage, hasNextPage, isPending, isError, isFetchingNextPage } =
		useInfiniteQuery({
			queryKey: ['manga-chapters', mangaId],
			queryFn: async ({ pageParam = 1 }) => {
				if (!isAuthenticated) {
					return await MangaService.getMangaChapters(mangaId, { page: pageParam, limit: 20 })
				}
				return await UserMangaService.getMangaChapters(mangaId, { page: pageParam, limit: 20 })
			},
			initialPageParam: 1,
			getNextPageParam: (lastPage) => {
				const { hasNextPage, currentPage } = lastPage.pagination
				return hasNextPage ? currentPage + 1 : undefined
			}
		})

	const observerRef = useRef<HTMLDivElement | null>(null)

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
				fetchNextPage()
			}
		})

		const currentElement = observerRef.current

		if (currentElement) {
			observer.observe(currentElement)
		}

		return () => {
			if (currentElement) {
				observer.unobserve(currentElement)
			}
		}
	}, [hasNextPage, fetchNextPage, isFetchingNextPage])

	if (isPending) {
		return <div>Loading...</div>
	}

	if (isError) {
		return <div>Error</div>
	}

	return (
		<div className='flex flex-col gap-2'>
			{data.pages.map((page) =>
				page.items.map((chapter: Chapter) => <ChapterCard key={chapter.id} chapter={chapter} />)
			)}
			<div ref={observerRef} />
			{isFetchingNextPage && (
				<div className='flex items-center justify-center p-4'>
					<div className='text-gray-600'>Cargando más capítulos...</div>
				</div>
			)}
		</div>
	)
}
