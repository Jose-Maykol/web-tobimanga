export interface Manga {
	id: string
	slug?: string
	title: string
	chapters: number
	coverImage: string
	rating: number
}

export interface MangaDetail extends Manga {
	authors: string[]
	genres: string[]
	demographic: {
		name: string
	}
	publicationStatus: string
	releaseDate: string
	bannerImage: string
	sinopsis: string
}

export interface ApiMangaDetail extends ApiMangaItem {
	authors: string[]
	genres: string[]
	demographic: {
		name: string
	}
	publication_status: string
	release_date: string
	banner_image: string
	sinopsis: string
}

export interface ApiMangaItem {
	id: string
	original_name: string
	rating: number
	cover_image: string
	chapters: number
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
