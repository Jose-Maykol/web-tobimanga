import apiAuth from '@/interceptors/api-auth-interceptor'
import { ApiAuthor, CreateAuthor } from '@/types/author'

class AuthorAdapter {
	public async getAllAuthors(): Promise<{ authors: { value: string; label: string }[] }> {
		const response = await apiAuth.get(`/authors`)
		const { authors } = response.data
		return {
			authors: authors.map((author: Partial<ApiAuthor>) => ({
				value: author.id,
				label: author.name
			}))
		}
	}

	public async createAuthor(author: CreateAuthor) {
		const response = await apiAuth.post(`/authors`, author)

		return {
			message: response.data.message,
			author: response.data.author
		}
	}
}

export const authorAdapter = new AuthorAdapter()
