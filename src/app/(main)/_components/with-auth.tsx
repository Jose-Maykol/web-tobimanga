import { useAuthStore } from '@/app/stores/auth-store'
import { ComponentType, useCallback, useEffect, useState } from 'react'

const withAuth = (Component: ComponentType<any>) => {
	return (props: any) => {
		const { checkAuth } = useAuthStore()
		const [loading, setLoading] = useState(true)

		const isAuthenticated = useCallback(async () => {
			await checkAuth()
			setLoading(false)
		}, [checkAuth])

		useEffect(() => {
			isAuthenticated()
		}, [isAuthenticated])

		if (loading) return null

		return <Component {...props} />
	}
}

export default withAuth
