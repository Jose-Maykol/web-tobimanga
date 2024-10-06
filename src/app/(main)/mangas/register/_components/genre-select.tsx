'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { MultipleSelector } from '@/components/ui/multiple-select'
import { formSchema } from './register-manga-form'
import { z } from 'zod'
import { Control } from 'react-hook-form'
import AddGnereDialog from './add-gnere-dialog'
import { useQuery } from '@tanstack/react-query'
import { genreService } from '@/services/api/genre-service'

interface GenreSelectProps {
	control: Control<z.infer<typeof formSchema>>
}

export default function GenreSelect({ control }: GenreSelectProps) {
	const { isPending, isError, data } = useQuery({
		queryKey: ['genres'],
		queryFn: async () => {
			return await genreService.getAllGenres()
		}
	})

	if (isPending) {
		return <div>Loading...</div>
	}

	if (isError) {
		return <div>Error</div>
	}

	return (
		<div className='flex flex-row gap-4 items-end'>
			<FormField
				control={control}
				name='genres'
				render={({ field }) => (
					<FormItem className='flex-1'>
						<FormLabel>Géneros</FormLabel>
						<FormControl>
							<MultipleSelector
								options={data.genres}
								placeholder='Selecciona géneros'
								value={field.value}
								onChange={field.onChange}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<AddGnereDialog />
		</div>
	)
}
