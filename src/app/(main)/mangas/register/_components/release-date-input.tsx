import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from './register-manga-form'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar as CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { Calendar } from '@/components/ui/calendar'

interface ReleaseDateInputProps {
	control: Control<z.infer<typeof formSchema>>
}

export default function ReleaseDateInput({ control }: ReleaseDateInputProps) {
	return (
		<FormField
			control={control}
			name='releaseDate'
			render={({ field }) => (
				<FormItem className='flex flex-col justify-end'>
					<FormLabel>Año de lanzamiento</FormLabel>
					<FormControl>
						{/* <Input placeholder='Año de lanzamiento' type='number' {...field} /> */}
						<Popover>
							<PopoverTrigger asChild>
								<Button
									variant={'outline'}
									className={cn(
										'justify-start text-left font-normal',
										!field.value && 'text-muted-foreground'
									)}
								>
									<CalendarIcon className='mr-2 h-4 w-4' />
									{field.value ? (
										format(new Date(field.value), 'dd/MM/yyyy')
									) : (
										<span>Selecciona una fecha</span>
									)}
								</Button>
							</PopoverTrigger>
							<PopoverContent className='w-auto p-0'>
								<Calendar
									mode='single'
									selected={field.value ? new Date(field.value) : undefined}
									onSelect={(selectedDate) => {
										field.onChange(selectedDate)
									}}
									initialFocus
								/>
							</PopoverContent>
						</Popover>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
