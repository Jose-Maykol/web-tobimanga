import { authAdapter } from '@/adapters/auth-adapter'
import { ApiAuth, User } from '@/types/auth'
import Cookies from 'js-cookie'

class AuthService {
	async login(email: string, password: string): Promise<ApiAuth> {
		const response = await authAdapter.login(email, password)
		Cookies.set('access_token', response.accessToken, { expires: 7 })
		localStorage.setItem('user', JSON.stringify(response.user))
		return response
	}

	async logout(): Promise<void> {
		Cookies.remove('access_token')
		localStorage.removeItem('user')
	}

	checkAuth(): boolean {
		const token = Cookies.get('access_token')
		return !!token
	}

	getUser(): Partial<User> | null {
		const user = localStorage.getItem('user')
		return user ? JSON.parse(user) : null
	}
}

export const authService = new AuthService()
