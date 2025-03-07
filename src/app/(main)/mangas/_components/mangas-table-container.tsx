'use client'

import Loader from '@/app/_components/loader/loader'
import { useQuery } from '@tanstack/react-query'
import { MangasTable } from './mangas-table'
import MangaService from '@/services/api/manga-service'

export default function MangasTableContainer() {
	const { isPending, isError, data } = useQuery({
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

	if (isError) {
		return <div>Error</div>
	}

	return (
		<div>
			<MangasTable data={data.items} />
		</div>
	)
}
