export interface Manga {
	id: string
	title: string
	description: string
	chapters: number
	releaseDate: string
	imageUrl: string
	finalized: boolean
	rating: number
	createdAt: string
	updatedAt: string
}

export interface ApiManga {
	id: string
	title: string
	description: string
	chapters: number
	release_date: string
	image_url: string
	finalized: boolean
	rating: number
	created_at: string
	updated_at: string
}
