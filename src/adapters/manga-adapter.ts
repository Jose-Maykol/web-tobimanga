import api from '@/interceptors/api-interceptor'
import { ApiMangaDetail, ApiMangas, CreateManga, Manga, MangaDetail } from '@/types/manga'
import { Paginated } from '@/types/pagination'
import { generateSlug } from '@/utils/generate-slug'

class MangaAdapter {
	public async getByPage(
		{ page, limit } = { page: 1, limit: 10 }
	): Promise<Paginated<Partial<Manga>>> {
		const response = await api.get(`/mangas`, {
			params: { page, limit }
		})
		const { mangas, pagination } = response.data
		return {
			items: mangas.map((manga: ApiMangas) => ({
				id: manga.id,
				slug: generateSlug(manga.original_name),
				title: manga.original_name,
				chapters: manga.chapters,
				coverImage: manga.cover_image,
				rating: manga.rating
			})),
			pagination: {
				total: pagination.total,
				itemsPerPage: pagination.itemsPerPage,
				currentPage: pagination.currentPage,
				pages: pagination.pages,
				hasNextPage: pagination.hasNextPage,
				hasPreviousPage: pagination.hasPreviousPage
			}
		}
	}

	public async createManga(
		manga: CreateManga
	): Promise<{ message: string; manga: Partial<Manga> }> {
		const response = await api.post(`/mangas`, manga)

		return {
			message: response.data.message,
			manga: response.data.manga
		}
	}

	public async getMangaBySlug(slug: string): Promise<MangaDetail> {
		const response = await api.get(`/mangas/${slug}`)
		const manga: ApiMangaDetail = response.data
		return {
			id: manga.id,
			title: manga.original_name,
			sinopsis: manga.sinopsis,
			chapters: manga.chapters,
			releaseDate: manga.release_date,
			coverImage: manga.cover_image,
			bannerImage: manga.banner_image,
			publicationStatus: manga.publication_status,
			rating: manga.rating,
			authors: manga.authors,
			demographic: manga.demographic.name,
			genres: manga.genres
		}
	}
}

export const mangaAdapter = new MangaAdapter()
