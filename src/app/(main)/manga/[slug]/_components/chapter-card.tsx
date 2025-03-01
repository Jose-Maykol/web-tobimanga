import { Chapter } from '@/types/chapter'
import { useState } from 'react'

interface ChapterCardProps {
	chapter: Chapter
}

export default function ChapterCard({ chapter }: ChapterCardProps) {
	const [isRead, setIsRead] = useState(chapter.read)

	const handleToggleReadStatus = () => {
		setIsRead(!isRead)
	}

	return (
		<div
			onClick={handleToggleReadStatus}
			className={`py-2 px-4 rounded-lg border flex flex-row justify-between hover:cursor-pointer
      ${isRead ? 'bg-green-600 hover:bg-green-700' : 'bg-card hover:bg-stone-800'}`}
		>
			<div className=''>
				<h3 className='font-bold'>{`
					Capítulo ${chapter.number}
				`}</h3>
			</div>
			<div
				className={`flex flex-row justify-center text-muted-foreground text-sm w-14
        ${isRead ? 'text-white' : 'text-muted-foreground'}`}
			>
				<p>{isRead ? 'Leido' : 'No leido'}</p>
			</div>
		</div>
	)
}
