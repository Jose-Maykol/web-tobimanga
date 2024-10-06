'use client'

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { MultipleSelector } from '@/components/ui/multiple-select'
import { Control } from 'react-hook-form'
import { formSchema } from './register-manga-form'
import { z } from 'zod'
import AddAuthorDialog from './add-author-dialog'
import { useQuery } from '@tanstack/react-query'
import { authorService } from '@/services/api/author-service'

interface AuthorInputProps {
	control: Control<z.infer<typeof formSchema>>
}

export default function AuthorInput({ control }: AuthorInputProps) {
	const { isPending, isError, data } = useQuery({
		queryKey: ['authors'],
		queryFn: async () => {
			return await authorService.getAllAuthors()
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
				name='authors'
				render={({ field }) => (
					<FormItem className='flex-1'>
						<FormLabel>Autor(es)</FormLabel>
						<FormControl>
							<MultipleSelector
								options={data.authors}
								placeholder='Selecciona autor(es)'
								value={field.value}
								onChange={field.onChange}
							/>
						</FormControl>
						<FormMessage />
					</FormItem>
				)}
			/>
			<AddAuthorDialog />
		</div>
	)
}
