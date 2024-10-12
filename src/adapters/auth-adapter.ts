import api from '@/interceptors/api-interceptor'
import { ApiError } from '@/types/api'
import { ApiAuth, ApiUser } from '@/types/auth'
import axios from 'axios'

class AuthAdapter {
	public async login(email: string, password: string): Promise<ApiAuth> {
		try {
			const response = await api.post('/auth/login', { email, password })
			const { user } = response.data
			console.log(typeof user)
			return {
				message: response.data.message,
				accessToken: response.data.access_token,
				user: {
					id: user.id,
					email: user.email,
					username: user.username,
					profileImage: user.profile_image
				}
			}
		} catch (error: unknown) {
			if (axios.isAxiosError(error) && error.response) {
				const errorData: ApiError = {
					status: error.response.data.status_code,
					message: error.response.data.message
				}
				throw errorData
			} else {
				const errorData: ApiError = {
					status: 500,
					message: 'Error desconocido'
				}
				throw errorData
			}
		}
	}
}

export const authAdapter = new AuthAdapter()
