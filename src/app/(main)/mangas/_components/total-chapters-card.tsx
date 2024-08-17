import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Book } from 'lucide-react'

export default function TotalChaptersCard() {
	return (
		<Card className='w-full'>
			<CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
				<CardTitle className='text-sm font-medium'>Capítulos registrados</CardTitle>
				<Book size={16} />
			</CardHeader>
			<CardContent>
				<div className='text-3xl font-bold'>231250</div>
			</CardContent>
		</Card>
	)
}
