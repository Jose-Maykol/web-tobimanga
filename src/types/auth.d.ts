export interface ApiAuth {
	message: string
	user: Partial<ApiUser>
	access_token: string
}

export interface Auth {
	message: string
	user: Partial<User>
	accessToken: string
}

export interface User {
	id: string
	email: string
	username: string
	profileImage: string | null
}

export interface ApiUser {
	id: string
	email: string
	username: string
	profile_image: string | null
}
