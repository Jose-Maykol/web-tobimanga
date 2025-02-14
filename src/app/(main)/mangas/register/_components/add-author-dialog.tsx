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
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import { authorService } from '@/services/api/author-service'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export default function AddAuthorDialog() {
	const [isOpen, setIsOpen] = useState<boolean>(false)
	const queryClient = useQueryClient()

	const handleSave = async (event: React.FormEvent) => {
		event.preventDefault()
		const formData = new FormData(event.target as HTMLFormElement)
		const newAuthor = formData.get('author-name') as string

		try {
			const response = await authorService.createAuthor({
				name: newAuthor
			})
			if (response) {
				queryClient.refetchQueries({
					queryKey: ['authors'],
					exact: true
				})
				setIsOpen(false)
				toast.success(response.message)
			}
		} catch (error) {
			//TODO: Manejar errores
			console.error(error)
			toast.error('Ocurrió un error al crear el autor')
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
					<DialogTitle>Crea un nuevo autor</DialogTitle>
				</DialogHeader>
				<form onSubmit={handleSave} id='author-form'>
					<div className='flex flex-col gap-2'>
						<Label htmlFor='author-name' className='text-muted-foreground'>
							Nombre del autor
						</Label>
						<Input name='author-name' id='author-name' />
					</div>
				</form>
				<DialogFooter>
					<div className='flex flex-row gap-4'>
						<Button type='submit' form='author-form'>
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
