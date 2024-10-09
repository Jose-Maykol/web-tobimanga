import api from '@/interceptors/api-interceptor'
import { ApiManga, CreateManga, Manga } from '@/types/manga'
import { Paginated } from '@/types/pagination'

class MangaAdapter {
	public async getByPage(
		{ page, limit } = { page: 1, limit: 10 }
	): Promise<Paginated<Partial<Manga>>> {
		const response = await api.get(`/mangas`, {
			params: { page, limit }
		})
		const { mangas, pagination } = response.data
		return {
			items: mangas.map((manga: Partial<ApiManga>) => ({
				id: manga.id,
				title: manga.original_name,
				chapters: manga.chapters,
				coverImage: manga.cover_image,
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

	public async createManga(
		manga: CreateManga
	): Promise<{ message: string; manga: Partial<Manga> }> {
		const response = await api.post(`/mangas`, manga)

		return {
			message: response.data.message,
			manga: response.data.manga
		}
	}
}

export const mangaAdapter = new MangaAdapter()
