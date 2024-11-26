'use client'

import Loader from '@/app/_components/loader/loader'
import { Button } from '@/components/ui/button'
import { mangaService } from '@/services/api/manga-service'
import { useQuery } from '@tanstack/react-query'
import { BookOpen, Check, Heart, Loader2 } from 'lucide-react'
import { useState } from 'react'

interface MangaDetailPageProps {
	params: {
		slug: string
	}
}

export default function MangaDetailPage({ params }: MangaDetailPageProps) {
	const { isPending, isError, data } = useQuery({
		queryKey: ['manga', params.slug],
		queryFn: async () => {
			return await mangaService.getMangaBySlug(params.slug)
		}
	})

	const [isFollowing, setIsFollowing] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleFollow = () => {
		setIsFollowing(true)
	}

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

	if (isError) {
		return <div>Error</div>
	}

	return (
		<section>
			<div>
				<img src={data.bannerImage} alt={data.title} className='w-full aspect-[14/5]' />
			</div>
			<div className='w-full flex flex-col items-center'>
				<div className='flex flex-row gap-4 max-w-5xl'>
					<div className='relative top-[-150px] w-[200px] min-w-[200px] space-y-2 flex flex-col'>
						<img
							src={data.coverImage}
							alt={data.title}
							width={200}
							height={300}
							className='aspect-[2/3] w-full'
						/>
						<Button
							onClick={handleFollow}
							onMouseEnter={() => setIsHovered(true)}
							onMouseLeave={() => setIsHovered(false)}
							disabled={isLoading}
							className={`w-full font-bold py-2 px-4 rounded transition-all duration-200 ${
								isFollowing
									? isHovered
										? 'bg-red-500 hover:bg-red-600 text-white'
										: 'bg-neutral-200 text-gray-800 hover:bg-neutral-300'
									: 'bg-primary text-white'
							}`}
						>
							{isLoading ? (
								<Loader2 className='mr-2 h-4 w-4 animate-spin' />
							) : isFollowing ? (
								isHovered ? (
									'Dejar de seguir'
								) : (
									<>
										<Check className='mr-2 h-4 w-4' />
										Siguiendo
									</>
								)
							) : (
								<>
									<BookOpen className='mr-2 h-4 w-4' />
									Seguir manga
								</>
							)}
						</Button>
					</div>
					<div className='py-4 space-y-2'>
						<h1 className='text-3xl font-semibold'>{data.title}</h1>
						<p className='text-muted-foreground text-sm'>{data.sinopsis}</p>
					</div>
				</div>
			</div>
		</section>
	)
}
