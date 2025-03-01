export interface ApiChapterItem {
	id: string
	chapter_number: number
	read_at?: string | null
	read?: boolean
}

export interface Chapter {
	id: string
	number: number
	readAt: string | null
	read: boolean
}
