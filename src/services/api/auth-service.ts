import { AuthAdapter } from '@/adapters/auth-adapter'
import { ErrorAdapter } from '@/adapters/error.adapter'
import api from '@/interceptors/api-interceptor'
import { ApiError } from '@/types/api'
import { ApiAuth, Auth, User } from '@/types/auth'
import axios from 'axios'
import Cookies from 'js-cookie'

class AuthService {
	private readonly TOKEN_EXPIRATION_DAYS = 7

	async login(email: string, password: string): Promise<Auth> {
		try {
			const response = await api.post('/auth/login', { email, password })
			const authData = await AuthAdapter.login(response.data)
			this.persistAuthData(authData)
			return authData
		} catch (error: unknown) {
			throw ErrorAdapter.toApiError(error)
		}
	}

	private persistAuthData(data: Auth): void {
		const { accessToken, user } = data
		Cookies.set('access_token', accessToken, { expires: this.TOKEN_EXPIRATION_DAYS })
		localStorage.setItem('user', JSON.stringify(user))
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
