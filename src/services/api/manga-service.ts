import api from '@/interceptors/api-interceptor'

class MangaService {
	async getByPage({ page, limit } = { page: 1, limit: 10 }) {
		const response = await api.get(`/mangas`, {
			params: { page, limit }
		})
		return response.data
	}
}

export const mangaService = new MangaService()
