/* eslint-disable no-unused-vars */
export interface Manga {
	id: string
	slug?: string
	title: string
	chapters: number
	coverImage: string
	rating: number
}

export interface MangaDetail extends Manga {
	authors: {
		id: string
		name: string
	}[]
	genres: {
		id: string
		name: string
	}[]
	demographic: {
		id: string
		name: string
	}
	publicationStatus: string
	releaseDate: string
	bannerImage: string
	sinopsis: string
}

export interface ApiMangaItem {
	id: string
	original_name: string
	rating: number
	cover_image: string
	chapters: number
}

export interface ApiMangaDetail extends ApiMangaItem {
	authors: {
		id: string
		name: string
	}[]
	genres: {
		id: string
		name: string
	}[]
	demographic: {
		id: string
		name: string
	}
	publication_status: string
	release_date: string
	banner_image: string
	sinopsis: string
}

export interface ApiCreateManga {
	message: string
	manga: {
		id: string
	}
}

export interface ResponseCreateManga {
	message: string
	manga: {
		id: string
	}
}

export interface CreateManga {
	originalName: string
	sinopsis: string
	chapters: number
	releaseDate: Date
	publicationStatus: string
	genres: string[]
	authors: string[]
	demographic: string
	bannerImage: {
		contentType: string
		data: string
	}
	coverImage: {
		contentType: string
		data: string
	}
}

export interface CreateMangaPayload {
	manga: {
		original_name: string
		sinopsis: string
		chapters: number
		release_date: Date
		publication_status: string
		banner_image: {
			contentType: string
			data: string
		}
		cover_image: {
			contentType: string
			data: string
		}
	}
	genres: {
		id: string
	}[]
	authors: {
		id: string
	}[]
	demographic: {
		id: string
	}
}
