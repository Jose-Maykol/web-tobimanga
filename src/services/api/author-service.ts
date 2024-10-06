import { authorAdapter } from '@/adapters/author-adapter'
import { CreateAuthor } from '@/types/author'

class AuthorService {
	async getAllAuthors() {
		const response = await authorAdapter.getAllAuthors()
		return response
	}

	async createAuthor(author: CreateAuthor) {
		const response = await authorAdapter.createAuthor(author)
		return response
	}
}

export const authorService = new AuthorService()
