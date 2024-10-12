import { authService } from '@/services/api/auth-service'
import { ApiAuth } from '@/types/auth'
import { create } from 'zustand'

interface AuthStore {
	isAuthenticated: boolean
	login: (email: string, password: string) => Promise<ApiAuth | undefined>
	logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
	isAuthenticated: false,
	message: null,

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
		console.log('Logout')
	}
}))
