import { authService } from '@/services/api/auth-service'
import { Auth, User } from '@/types/auth'
import { create } from 'zustand'

interface AuthStore {
	isAuthenticated: boolean
	user: Partial<User> | null
	login: (email: string, password: string) => Promise<Auth | undefined>
	logout: () => void
	checkAuth: () => Promise<void>
	getUser: () => Partial<User> | null
}

export const useAuthStore = create<AuthStore>((set) => ({
	isAuthenticated: false,
	message: null,
	user: null,

	login: async (email, password) => {
		try {
			const response = await authService.login(email, password)
			set({
				isAuthenticated: true
			})
			return response
		} catch (error) {
			set({
				isAuthenticated: false
			})
			throw error
		}
	},

	logout: () => {
		authService.logout()
		set({
			isAuthenticated: false,
			user: null
		})
	},

	checkAuth: async () => {
		const token = await authService.checkAuth()
		const user = await authService.getUser()
		if (token) {
			set({
				isAuthenticated: true,
				user
			})
		}
	},

	getUser: () => {
		return authService.getUser()
	}
}))
