export interface Manga {
	id: string
	title: string
	description: string
	chapters: number
	releaseDate: string
	coverImage: string
	bannerImage: string
	finalized: boolean
	rating: number
	createdAt: string
	updatedAt: string
}

export interface ApiManga {
	id: string
	original_name: string
	cover_image: string
	banner_image: string
	rating: number
	description: string
	chapters: number
	release_date: string
	finalized: boolean
	rating: number
	created_at: string
	updated_at: string
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
