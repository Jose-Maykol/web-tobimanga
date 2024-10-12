import { authAdapter } from '@/adapters/auth-adapter'
import { ApiAuth } from '@/types/auth'
import Cookies from 'js-cookie'

class AuthService {
	async login(email: string, password: string): Promise<ApiAuth> {
		const response = await authAdapter.login(email, password)
		Cookies.set('access_token', response.accessToken, { expires: 7 })
		return response
	}
}

export const authService = new AuthService()
