import { useAuthStore } from '@/app/stores/auth-store'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectGroup, SelectTrigger } from '@/components/ui/select'
import { ReadingStatus } from '@/enums/reading-status.enum'
import UserMangaService from '@/services/api/user-manga-service'
import { useQuery } from '@tanstack/react-query'
import { BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

const readingStatusOptions: { value: ReadingStatus; label: string }[] = [
	{ value: ReadingStatus.READING, label: 'Leyendo' },
	{ value: ReadingStatus.COMPLETED, label: 'Completado' },
	{ value: ReadingStatus.DROPPED, label: 'Abandonado' },
	{ value: ReadingStatus.PLANNING_TO_READ, label: 'Planeado' },
	{ value: ReadingStatus.PAUSED, label: 'Pausado' }
]

const allowedStatuses: ReadingStatus[] = [
	ReadingStatus.COMPLETED,
	ReadingStatus.DROPPED,
	ReadingStatus.PAUSED
]

type StartFollowingReadingButtonProps = {
	manga: {
		id: string
		/* 		status: ReadingStatus */
	}
}

export default function StartFollowingReadingButton({ manga }: StartFollowingReadingButtonProps) {
	const { isAuthenticated } = useAuthStore()
	const [isFollowing, setIsFollowing] = useState(false)
	const [isOpen, setIsOpen] = useState(false)
	const [selectedStatus, setSelectedStatus] = useState<ReadingStatus>(ReadingStatus.READING)
	const router = useRouter()

	const { isPending, isError, data } = useQuery({
		queryKey: ['manga-reading-status', manga.id],
		queryFn: async () => {
			return await UserMangaService.getStatusReading(manga.id)
		},
		enabled: !!isAuthenticated && !!manga.id
	})

	useEffect(() => {
		if (data) {
			setIsFollowing(true)
			setSelectedStatus(data.reading_status)
		}
	}, [data])

	useEffect(() => {
		if (!isAuthenticated) {
			setIsFollowing(false)
			setSelectedStatus(ReadingStatus.READING)
		}
	}, [isAuthenticated])

	const handleStartReading = async () => {
		if (!isAuthenticated) {
			router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
			return
		}

		try {
			await UserMangaService.setStatusReading(manga.id)
			toast.success('¡Ahora sigues este manga!')
			setIsFollowing(true)
		} catch (error) {
			console.error(error)
			toast.error('¡Algo salió mal!')
		}
	}

	const handleOptionSelect = (status: ReadingStatus) => {
		setSelectedStatus(status)
		toast.success(`¡Estado actualizado! Ahora estás ${status.toLowerCase()}`)
		setIsOpen(false)
	}

	if (isPending && !!isAuthenticated) {
		return (
			<div className='w-full rounded-sm bg-primary h-10 flex items-center justify-center'>
				Loading...
			</div>
		)
	}

	if (isError && !!isAuthenticated) {
		return <div>Error</div>
	}

	if (isFollowing) {
		return (
			<Select
				onValueChange={(value) => setSelectedStatus(value as ReadingStatus)}
				open={isOpen}
				onOpenChange={setIsOpen}
			>
				<SelectTrigger className='bg-neutral-200 text-black focus:ring-0'>
					<BookOpen className='mr-2 h-4 w-4' />{' '}
					<p>{readingStatusOptions.find((option) => option.value === selectedStatus)?.label}</p>
				</SelectTrigger>
				<SelectContent align='end' className='w-[200px]'>
					<SelectGroup>
						{readingStatusOptions
							.filter((option) => allowedStatuses.includes(option.value))
							.map((option) => (
								<div
									key={option.value}
									className='cursor-pointer hover:bg-neutral-700 p-2 rounded-sm text-sm text-center'
									onClick={() => handleOptionSelect(option.value)}
								>
									<span className='text-center'>{option.label}</span>
								</div>
							))}
					</SelectGroup>
				</SelectContent>
			</Select>
		)
	}

	return (
		<Button className='w-full rounded-sm font-bold' onClick={handleStartReading}>
			<BookOpen className='mr-2 h-4 w-4' /> <p>Seguir lectura</p>
		</Button>
	)
}
