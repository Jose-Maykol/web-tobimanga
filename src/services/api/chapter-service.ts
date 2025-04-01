import apiAuth from '@/interceptors/api-auth-interceptor'

const chapterService = {
	async read(chapterId: string): Promise<void> {
		const response = await apiAuth.post(`users/chapters/${chapterId}/read`)
		return response.data
	},

	async unread(chapterId: string): Promise<void> {
		const response = await apiAuth.delete(`users/chapters/${chapterId}/read`)
		return response.data
	}
}

export default chapterService
