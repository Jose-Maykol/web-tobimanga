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
		const createManga = {
			manga: {
				original_name: manga.originalName,
				sinopsis: manga.sinopsis,
				release_date: manga.releaseDate,
				publication_status: manga.publicationStatus,
				chapters: manga.chapters,
				bannerImage: manga.bannerImage,
				coverImage: manga.coverImage
			},
			demographic: {
				id: manga.demographic
			},
			genres: manga.genres.map((genre) => ({
				id: genre
			})),
			authors: manga.authors.map((author) => ({
				id: author
			}))
		}
		const response = await api.post(`/mangas`, createManga)
		return MangaAdapter.createManga(response.data)
	}

	async getMangaBySlug(slug: string): Promise<MangaDetail> {
		const response = await api.get(`/mangas/${slug}`)
		return MangaAdapter.getMangaBySlug(response.data)
	}
}

export const mangaService = new MangaService()
