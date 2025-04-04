import apiAuth from '@/interceptors/api-auth-interceptor'
import { ApiGenre } from '@/types/genre'

class GenreAdapter {
	async getAllGenres(): Promise<{ genres: { value: string; label: string }[] }> {
		const response = await apiAuth.get(`mangas/genres`)
		const { genres } = response.data
		return {
			genres: genres.map((genre: Partial<ApiGenre>) => ({
				value: genre.id,
				label: genre.name
			}))
		}
	}

	async createGenre(genre: { name: string }) {
		const response = await apiAuth.post(`mangas/genres`, genre)

		return {
			message: response.data.message,
			genre: response.data.genre
		}
	}
}

export const genreAdapter = new GenreAdapter()
