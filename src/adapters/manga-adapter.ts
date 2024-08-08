import { mangaService } from '@/services/api/manga-service'
import { ApiManga, Manga } from '@/types/manga'
import { Paginated } from '@/types/pagination'

class MangaAdapter {
	public async getByPage({ page, limit } = { page: 1, limit: 10 }): Promise<Paginated<Manga>> {
		const response = await mangaService.getByPage({ page, limit })
		const { mangas, pagination } = response
		return {
			items: mangas.map((manga: Partial<ApiManga>) => ({
				id: manga.id,
				title: manga.title,
				chapters: manga.chapters,
				imageUrl: manga.image_url,
				rating: manga.rating
			})),
			pagination: {
				total: pagination.total,
				itemsPerPage: pagination.itemsPerPage,
				currentPage: pagination.currentPage,
				pages: pagination.pages,
				hasNextPage: pagination.hasNextPage,
				hasPreviousPage: pagination.hasPreviousPage
			}
		}
	}
}

export const mangaAdapter = new MangaAdapter()
