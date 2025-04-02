import { MangaAdapter } from '@/adapters/manga-adapter'
import apiAuth from '@/interceptors/api-auth-interceptor'

const UserMangaService = {
	async getMangaChapters(
		mangaId: string,
		pagination: { page: number; limit: number } = { page: 1, limit: 20 }
	) {
		const { page, limit } = pagination
		const response = await apiAuth.get(`users/me/mangas/${mangaId}/chapters`, {
			params: { page, limit }
		})
		return MangaAdapter.getMangaChapters(response.data)
	},

	async getStatusReading(uuid: string) {
		const response = await apiAuth.get(`users/me/mangas/${uuid}/status`)
		console.log(response.data)
		return response.data
	},

	async setStatusReading(uuid: string) {
		const response = await apiAuth.post(`/mangas/${uuid}/status`, { status: 'READING' })
		console.log(response.data)
		return response.data
	}
}

export default UserMangaService
