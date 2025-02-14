import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { genreService } from '@/services/api/genre-service'
import { useQueryClient } from '@tanstack/react-query'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function AddGnereDialog() {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const queryClient = useQueryClient()

	const handleSave = async (event: React.FormEvent) => {
		event.preventDefault()
		const formData = new FormData(event.target as HTMLFormElement)
		const newGenre = formData.get('genre-name') as string

		try {
			const response = await genreService.createGenre({
				name: newGenre
			})
			if (response) {
				queryClient.refetchQueries({
					queryKey: ['genres'],
					exact: true
				})
				setIsOpen(false)
				toast.success(response.message)
			}
		} catch (error) {
			//TODO: Manejar errores
			console.error(error)
			toast.error('Ocurrió un error al crear el género')
		}
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger className='p-2' asChild>
				<Button className='self-center'>
					<Plus />
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Crea un nuevo género</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSave} id='genre-form'>
					<div className='flex flex-col gap-2'>
						<Label htmlFor='genre-name' className='text-muted-foreground'>
							Nombre del autor
						</Label>
						<Input name='genre-name' id='genre-name' />
					</div>
				</form>
				<DialogFooter>
					<div className='flex flex-row gap-4'>
						<Button type='submit' form='genre-form'>
							Guardar
						</Button>
						<DialogClose>
							<Button variant='outline'>Cancelar</Button>
						</DialogClose>
					</div>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
