import { useState } from 'react'

export default function ChapterCard() {
	const [isRead, setIsRead] = useState(false)

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
				<h3 className='font-bold'>Capitulo 1</h3>
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
