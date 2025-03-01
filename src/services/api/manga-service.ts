import { MangaAdapter } from '@/adapters/manga-adapter'
import Cookies from 'js-cookie'
import api from '@/interceptors/api-interceptor'
import { Chapter } from '@/types/chapter'
import { CreateManga, Manga, MangaDetail, ResponseCreateManga } from '@/types/manga'
import { Paginated } from '@/types/pagination'
import apiAuth from '@/interceptors/api-auth-interceptor'

const MangaService = {
	async getByPage({ page, limit } = { page: 1, limit: 10 }): Promise<Paginated<Manga>> {
		const response = await api.get('/mangas', {
			params: { page, limit }
		})
		return MangaAdapter.getByPage(response.data)
	},

	async createManga(manga: CreateManga): Promise<ResponseCreateManga> {
		const authToken = Cookies.get('access_token')
		const createManga = MangaAdapter.createMangaPayload(manga)
		const response = await api.post('/mangas', createManga, {
			headers: { Authorization: `Bearer ${authToken}` }
		})
		return MangaAdapter.createMangaResponse(response.data)
	},

	async getMangaBySlug(slug: string): Promise<MangaDetail> {
		const response = await api.get(`/mangas/${slug}`)
		return MangaAdapter.getMangaBySlug(response.data)
	},

	async getMangaChapters(
		mangaId: string,
		pagination: { page: number; limit: number } = { page: 1, limit: 20 }
	): Promise<Paginated<Chapter>> {
		const { page, limit } = pagination
		const response = await apiAuth.get(`/mangas/${mangaId}/chapters`, {
			params: { page, limit }
		})
		return MangaAdapter.getMangaChapters(response.data)
	}
}

export default MangaService
