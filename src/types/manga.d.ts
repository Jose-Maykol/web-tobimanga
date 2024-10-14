export interface Manga {
	id: string
	slug?: string
	title: string
	chapters: number
	coverImage: string
	rating: number
}

export interface MangaDetail extends Manga {
	releaseDate: string
	bannerImage: string
	sinopsis: string
	authors: string[]
	genres: string[]
	demographic: string
	publicationStatus: string
	sinopsis: string
}

export interface ApiMangas {
	id: string
	original_name: string
	cover_image: string
	rating: number
	chapters: number
}

export interface ApiMangaDetail extends ApiManga {
	authors: string[]
	genres: string[]
	demographic: {
		name: string
	}
	publication_status: string
	banner_image: string
	sinopsis: string
	release_date: string
}

export interface ApiManga {
	id: string
	rating: number
	original_name: string
	cover_image: string
	chapters: number
}

export interface CreateManga {
	authors: string[]
	bannerImage: {
		contentType: string
		data: string
	}
	coverImage: {
		contentType: string
		data: string
	}
	demographic: string
	genres: string[]
	publicationStatus: string
	releaseDate: Date
	sinopsis: string
	originalName: string
}
