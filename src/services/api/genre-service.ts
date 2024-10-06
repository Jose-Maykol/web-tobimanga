import { genreAdapter } from '@/adapters/genre-adapter'
import { CreateGenre } from '@/types/genre'

class GenreService {
	async getAllGenres() {
		const response = await genreAdapter.getAllGenres()
		return response
	}

	async createGenre(genre: CreateGenre) {
		const response = await genreAdapter.createGenre(genre)
		return response
	}
}

export const genreService = new GenreService()
