import { API_URL } from '@/config/env'
import axios from 'axios'
import Cookies from 'js-cookie'

const apiAuth = axios.create({
	baseURL: `${API_URL}/api/v1`,
	timeout: 5000
})

apiAuth.interceptors.request.use(
	(config) => {
		const cookieStore = Cookies
		const token = cookieStore.get('access_token')
		if (token) config.headers.Authorization = `Bearer ${token}`
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

apiAuth.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		if (error.response?.status === 401) {
			console.warn('Unauthorized')
		}
		return Promise.reject(error)
	}
)

export default apiAuth
