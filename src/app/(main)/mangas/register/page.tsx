import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RegisterMangaForm from './_components/register-manga-form'

export default function RegisterMangaPage() {
	return (
		<section className='flex flex-col w-full items-center'>
			<div className='md:max-w-screen-md w-full lg:max-w-screen-lg'>
				<Card className='bg-background'>
					<CardHeader>
						<CardTitle>Registra un nuevo manga</CardTitle>
					</CardHeader>
					<CardContent>
						<RegisterMangaForm />
					</CardContent>
				</Card>
			</div>
		</section>
	)
}
