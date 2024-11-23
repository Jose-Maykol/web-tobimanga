import { MangaAdapter } from '@/adapters/manga-adapter'
import api from '@/interceptors/api-interceptor'
import { CreateManga, Manga, MangaDetail, ResponseCreateManga } from '@/types/manga'
import { Paginated } from '@/types/pagination'

class MangaService {
	async getByPage({ page, limit } = { page: 1, limit: 10 }): Promise<Paginated<Partial<Manga>>> {
		const response = await api.get('/mangas', {
			params: { page, limit }
		})
		return MangaAdapter.getByPage(response.data)
	}

	async createManga(manga: CreateManga): Promise<ResponseCreateManga> {
		const response = await api.post(`/mangas`, manga)
		return MangaAdapter.createManga(response.data)
	}

	async getMangaBySlug(slug: string): Promise<MangaDetail> {
		const response = await api.post(`/mangas/${slug}`)
		return MangaAdapter.getMangaBySlug(response.data)
	}
}

export const mangaService = new MangaService()
