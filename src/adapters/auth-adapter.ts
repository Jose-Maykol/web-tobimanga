import { ApiAuth, Auth } from '@/types/auth'

export class AuthAdapter {
	public static async login(data: ApiAuth): Promise<Auth> {
		const { user, access_token, message } = data
		return {
			message: message,
			accessToken: access_token,
			user: {
				id: user.id,
				email: user.email,
				username: user.username,
				profileImage: user.profile_image
			}
		}
	}
}
