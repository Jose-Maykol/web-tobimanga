import { mangaAdapter } from '@/adapters/manga-adapter'
import { CreateManga, Manga } from '@/types/manga'
import { Paginated } from '@/types/pagination'

class MangaService {
	async getByPage({ page, limit } = { page: 1, limit: 10 }): Promise<Paginated<Partial<Manga>>> {
		const response = await mangaAdapter.getByPage({ page, limit })
		return response
	}

	async createManga(manga: CreateManga): Promise<{ message: string; manga: Partial<Manga> }> {
		const response = await mangaAdapter.createManga(manga)
		return response
	}
}

export const mangaService = new MangaService()
