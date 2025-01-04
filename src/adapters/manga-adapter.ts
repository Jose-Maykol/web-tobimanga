import api from '@/interceptors/api-interceptor'
import { ApiChapterItem, Chapter } from '@/types/chapter'
import {
	ApiCreateManga,
	ApiMangaDetail,
	ApiMangaItem,
	CreateManga,
	CreateMangaPayload,
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
	}): Promise<Paginated<Manga>> {
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

	public static createMangaPayload(manga: CreateManga): CreateMangaPayload {
		return {
			manga: {
				original_name: manga.originalName,
				sinopsis: manga.sinopsis,
				release_date: manga.releaseDate,
				publication_status: manga.publicationStatus,
				chapters: manga.chapters,
				banner_image: manga.bannerImage,
				cover_image: manga.coverImage
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
	}

	public static createMangaResponse(response: ApiCreateManga): ResponseCreateManga {
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
			authors: manga.authors.map((author) => ({
				id: author.id,
				name: author.name
			})),
			demographic: {
				id: manga.demographic.id,
				name: manga.demographic.name
			},
			genres: manga.genres.map((genre) => ({
				id: genre.id,
				name: genre.name
			}))
		}
	}

	public static async getMangaChapters(response: {
		chapters: ApiChapterItem[]
		pagination: ApiPagination
	}): Promise<Paginated<Chapter>> {
		const { chapters, pagination } = response
		return {
			items: chapters.map((chapter: ApiChapterItem) => ({
				id: chapter.id,
				number: chapter.chapter_number
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
}
