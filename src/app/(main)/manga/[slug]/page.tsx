'use client'

import Loader from '@/app/_components/loader/loader'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
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
			<div className='min-h-64'>
				<img
					src={data.bannerImage}
					alt={data.title}
					className='min-h-64 w-full aspect-[14/5] object-cover'
				/>
			</div>
			<div className='w-full flex flex-col items-center'>
				<div className='relative flex flex-col gap-4 max-w-5xl items-center sm:flex-row sm:items-start mx-4'>
					<div className='relative top-[-150px] w-[200px] min-w-[200px] flex flex-col gap-2 mb-[-150px]'>
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
						<Card className='py-2 mt-4'>
							<CardContent className='px-4 space-y-2'>
								{/* Se debe agregar los nombres alternativos si existen */}
								<h3 className='text-sm text-muted-foreground'>Demografía</h3>
								<Badge className='bg-green-600 text-white'>
									<p>{data.demographic.name}</p>
								</Badge>
								<h3 className='text-sm text-muted-foreground'>Capítulos</h3>
								<p className='text-sm font-bold'>{data.chapters}</p>
								<h3 className='text-sm text-muted-foreground'>Estado de publicación</h3>
								<Badge>
									<p>{data.publicationStatus}</p>
								</Badge>
								{/* Podria ponerse la ultima fecha de actualizacion del manga */}
							</CardContent>
						</Card>
					</div>
					<div className='p-4 space-y-2'>
						<div>
							<h1 className='text-3xl font-semibold'>{data.title}</h1>
							<p className='text-muted-foreground text-sm my-4'>{data.sinopsis}</p>
						</div>
						<div className=' flex flex-row gap-2'>
							{data.genres.map((genre) => (
								<Badge key={genre.id}>
									<p className='text-white'>{genre.name}</p>
								</Badge>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	)
}
