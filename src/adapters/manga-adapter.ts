import api from '@/interceptors/api-interceptor'
import {
	ApiCreateManga,
	ApiMangaDetail,
	ApiMangaItem,
	CreateManga,
	Manga,
	MangaDetail,
	ResponseCreateManga
} from '@/types/manga'
import { ApiPagination, Paginated } from '@/types/pagination'
import { generateSlug } from '@/utils/generate-slug'

export class MangaAdapter {
	public static async getByPage(response: {
		mangas: ApiMangaItem[]
		pagination: ApiPagination
	}): Promise<Paginated<Partial<Manga>>> {
		const { mangas, pagination } = response
		return {
			items: mangas.map((manga: ApiMangaItem) => ({
				id: manga.id,
				slug: generateSlug(manga.original_name),
				title: manga.original_name,
				chapters: manga.chapters,
				coverImage: manga.cover_image,
				rating: manga.rating
			})),
			pagination: {
				total: pagination.total,
				itemsPerPage: pagination.items_per_page,
				currentPage: pagination.current_page,
				pages: pagination.pages,
				hasNextPage: pagination.has_next_page,
				hasPreviousPage: pagination.has_previous_page
			}
		}
	}

	public static async createManga(response: ApiCreateManga): Promise<ResponseCreateManga> {
		return {
			message: response.message,
			manga: {
				id: response.manga.id
			}
		}
	}

	public static async getMangaBySlug(response: any): Promise<MangaDetail> {
		const manga: ApiMangaDetail = response
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
			demographic: {
				name: manga.demographic.name
			},
			genres: manga.genres
		}
	}
}
