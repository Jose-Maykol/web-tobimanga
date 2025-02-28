import apiAuth from '@/interceptors/api-auth-interceptor'

const UserMangaService = {
	async getStatusReading(uuid: string) {
		const response = await apiAuth.get(`/mangas/${uuid}/status`)
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
