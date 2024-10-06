import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Control } from 'react-hook-form'
import { z } from 'zod'
import { formSchema } from './register-manga-form'
import { useQuery } from '@tanstack/react-query'
import { demographyService } from '@/services/api/demography-service'

interface DemographySelectProps {
	control: Control<z.infer<typeof formSchema>>
}

export default function DemographySelect({ control }: DemographySelectProps) {
	const { isPending, isError, data } = useQuery({
		queryKey: ['demographies'],
		queryFn: async () => {
			return await demographyService.getAllDemographics()
		}
	})

	if (isPending) {
		return <div>Loading...</div>
	}

	if (isError) {
		return <div>Error</div>
	}

	return (
		<FormField
			control={control}
			name='demography'
			render={({ field }) => (
				<FormItem>
					<FormLabel>Demografía</FormLabel>
					<FormControl>
						<Select onValueChange={field.onChange} defaultValue={field.value}>
							<SelectTrigger>
								<SelectValue placeholder='Selecciona una demografía' {...field} />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{data.demographics.map((demography) => (
										<SelectItem key={demography.value} value={demography.value}>
											{demography.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					</FormControl>
					<FormMessage />
				</FormItem>
			)}
		/>
	)
}
