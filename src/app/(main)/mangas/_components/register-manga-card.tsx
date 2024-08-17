import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

export default function RegisterMangaCard() {
	return (
		<Card>
			<CardHeader className='pb-3'>
				<CardTitle>Tobimanga</CardTitle>
				<CardDescription className='max-w-4xl text-balance leading-relaxed'>
					Bienvenido a Tobimanga, aquí podrás registrar tus mangas favoritos y llevar un control de
					los capítulos que has leído.
				</CardDescription>
			</CardHeader>
			<CardFooter>
				<Button>Registrar nuevo manga</Button>
			</CardFooter>
		</Card>
	)
}
