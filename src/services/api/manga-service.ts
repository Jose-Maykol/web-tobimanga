import { MangaAdapter } from '@/adapters/manga-adapter'
import api from '@/interceptors/api-interceptor'
import { CreateManga, Manga, MangaDetail, ResponseCreateManga } from '@/types/manga'
import { Paginated } from '@/types/pagination'

class MangaService {
	async getByPage({ page, limit } = { page: 1, limit: 10 }): Promise<Paginated<Manga>> {
		const response = await api.get('/mangas', {
			params: { page, limit }
		})
		return MangaAdapter.getByPage(response.data)
	}

	async createManga(manga: CreateManga): Promise<ResponseCreateManga> {
		const createManga = MangaAdapter.createMangaPayload(manga)
		const response = await api.post(`/mangas`, createManga)
		return MangaAdapter.createMangaResponse(response.data)
	}

	async getMangaBySlug(slug: string): Promise<MangaDetail> {
		const response = await api.get(`/mangas/${slug}`)
		return MangaAdapter.getMangaBySlug(response.data)
	}
}

export const mangaService = new MangaService()
