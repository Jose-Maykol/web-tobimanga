'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { MultipleSelector } from '@/components/ui/multiple-select'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import ImageInput from './image-input'
import AuthorSelect from './author-select'
import GenreSelect from './genre-select'
import DemographySelect from './demography-select'
import ReleaseYearDatePicker from './release-year-date-picker'

export const formSchema = z.object({
	title: z.string(),
	sinopsis: z.string(),
	chapters: z.number().int().positive(),
	releaseYear: z.date(),
	publicationStatus: z.string({
		required_error: 'Debes seleccionar un estado de publicación'
	}),
	genres: z.array(z.string()),
	authors: z.array(z.string()),
	demography: z.string(),
	bannerImage: z.object({
		contentType: z.string(),
		data: z.string()
	}),
	coverImage: z.object({
		contentType: z.string(),
		data: z.string()
	})
})

export default function RegisterMangaForm() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: '',
			sinopsis: '',
			chapters: 0,
			genres: [],
			authors: []
		}
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		console.log(values)
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className='flex flex-col gap-4 pb-4'>
					<FormField
						control={form.control}
						name='bannerImage'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Imagen de banner</FormLabel>
								<FormControl>
									<ImageInput
										id='banner'
										placeholder='Selecciona una imagen de banner'
										onChange={field.onChange}
										className='h-full md:h-80'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='grid grid-cols-1 md:grid-cols-[220px_1fr] gap-4'>
						<div className='col-span-1'>
							<FormField
								control={form.control}
								name='coverImage'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Imagen de portada</FormLabel>
										<FormControl>
											<ImageInput
												id='cover'
												placeholder='Selecciona una imagen de portada'
												onChange={field.onChange}
												className='h-full md:h-72'
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<div className='col-span-1 flex flex-col gap-4'>
							<div>
								<FormField
									control={form.control}
									name='title'
									render={({ field }) => (
										<FormItem>
											<FormLabel>Nombre del manga</FormLabel>
											<FormControl>
												<Input placeholder='Nombre del manga' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
							<div className='flex-1'>
								<FormField
									control={form.control}
									name='sinopsis'
									render={({ field }) => (
										<FormItem className='h-[200px] max-h-[200px]'>
											<FormLabel>Sinopsis del manga</FormLabel>
											<FormControl>
												<Textarea className='h-full' placeholder='Sinopsis del manga' {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					</div>
					<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
						<AuthorSelect control={form.control} />
						<FormField
							control={form.control}
							name='publicationStatus'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Estado de publicación</FormLabel>
									<FormControl>
										<Select onValueChange={field.onChange} defaultValue={field.value}>
											<SelectTrigger>
												<SelectValue placeholder='Estado de publicación' {...field} />
											</SelectTrigger>
											<SelectContent>
												<SelectGroup>
													<SelectItem value='finished'>Finalizado</SelectItem>
													<SelectItem value='releasing'>En emisión</SelectItem>
													<SelectItem value='hiatus'>En pausa</SelectItem>
													<SelectItem value='cancelled'>Cancelado</SelectItem>
													<SelectItem value='not yet released'>No lanzado</SelectItem>
												</SelectGroup>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='chapters'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Número de capítulos</FormLabel>
									<FormControl>
										<Input
											placeholder='Número de capítulos'
											type='number'
											{...field}
											onChange={(e) => field.onChange(e.target.valueAsNumber)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<ReleaseYearDatePicker control={form.control} />
						<DemographySelect control={form.control} />
						<GenreSelect control={form.control} />
					</div>
				</div>
				<Button type='submit' className='w-full'>
					Registrar manga
				</Button>
			</form>
		</Form>
	)
}
