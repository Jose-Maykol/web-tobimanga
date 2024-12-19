import { ApiError } from '@/types/api'
import axios from 'axios'

export class ErrorAdapter {
	static toApiError(error: unknown): ApiError {
		if (axios.isAxiosError(error) && error.response) {
			return {
				status: error.response.data.status_code,
				message: error.response.data.message
			}
		}

		return {
			status: 500,
			message: 'Error desconocido'
		}
	}
}
