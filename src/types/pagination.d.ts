/* total: pagination.total,
				itemsPerPage: pagination.itemsPerPage,
				currentPage: pagination.currentPage,
				pages: pagination.pages,
				hasNextPage: pagination.hasNextPage,
				hasPreviousPage: pagination.hasPreviousPage */

export interface Pagination {
	total: number
	itemsPerPage: number
	currentPage: number
	pages: number
	hasNextPage: boolean
	hasPreviousPage: boolean
}

export interface ApiPagination {
	total: number
	items_per_page: number
	current_page: number
	pages: number
	has_next_page: boolean
	has_previous_page: boolean
}

export interface Paginated<T> {
	items: T[]
	pagination: Pagination
}
