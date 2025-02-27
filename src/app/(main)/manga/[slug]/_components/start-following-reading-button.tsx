import { useAuthStore } from '@/app/stores/auth-store'
import { Button } from '@/components/ui/button'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { ReadingStatus } from '@/enums/reading-status.enum'
import { BookOpen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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

export default function StartFollowingReadingButton() {
	const { isAuthenticated } = useAuthStore()
	const [isFollowing, setIsFollowing] = useState(false)
	const router = useRouter()

	const handleFollow = () => {
		if (!isAuthenticated) {
			router.push(`/login?redirect=${encodeURIComponent(window.location.pathname)}`)
			return
		}
		setIsFollowing(true)
		toast.success('¡Ahora sigues este manga!')
	}

	if (isFollowing) {
		return (
			<div>
				<Select>
					<SelectTrigger className='bg-neutral-200 text-black focus:ring-0'>
						<SelectValue placeholder={'Siguendo'} />
					</SelectTrigger>
					<SelectContent align='end' className='w-[200px]'>
						<SelectGroup>
							{readingStatusOptions
								.filter((option) => allowedStatuses.includes(option.value))
								.map((option) => (
									<SelectItem key={option.value} value={option.value}>
										<SelectLabel className='text-center'>{option.label}</SelectLabel>
									</SelectItem>
								))}
						</SelectGroup>
					</SelectContent>
				</Select>
			</div>
		)
	}

	return (
		<div className='flex flex-row gap-2'>
			<Button className='w-full rounded-sm font-bold' onClick={handleFollow}>
				<BookOpen className='mr-2 h-4 w-4' /> <p>Seguir lectura</p>
			</Button>
		</div>
	)
}
