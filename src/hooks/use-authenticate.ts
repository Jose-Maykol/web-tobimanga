import { useAuthStore } from '@/app/stores/auth-store'
import { useCallback, useEffect, useState } from 'react'

export const useAuthenticate = () => {
	const { checkAuth } = useAuthStore()
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<Error | null>(null)

	const authenticate = useCallback(async () => {
		try {
			await checkAuth()
		} catch (error) {
			setError(error as Error)
		} finally {
			setLoading(false)
		}
	}, [checkAuth])

	useEffect(() => {
		authenticate()
	}, [authenticate])

	return { loading, error }
}
