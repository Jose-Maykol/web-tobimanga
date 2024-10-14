import MangasTableContainer from './_components/mangas-table-container'
import NewChaptersCard from './_components/new-chapters-card'
import RegisterMangaCard from './_components/register-manga-card'
import TotalChaptersCard from './_components/total-chapters-card'
import TotalMangasCard from './_components/total-mangas-card'

export default function MangasPage() {
	return (
		<section className='flex flex-col w-full items-center mt-16'>
			<div className='md:max-w-screen-md w-full lg:max-w-screen-lg'>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-3 auto-rows-auto'>
					<div className='md:col-span-3'>
						<RegisterMangaCard />
					</div>
					<TotalMangasCard />
					<TotalChaptersCard />
					<NewChaptersCard />
					<div className='md:col-span-3'>
						<MangasTableContainer />
					</div>
				</div>
			</div>
		</section>
	)
}
