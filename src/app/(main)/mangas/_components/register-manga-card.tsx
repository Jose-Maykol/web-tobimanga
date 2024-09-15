import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

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
				<Link href='/mangas/register' prefetch={false}>
					<Button>Registrar nuevo manga</Button>
				</Link>
			</CardFooter>
		</Card>
	)
}
