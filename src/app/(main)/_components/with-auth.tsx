import { useAuthenticate } from '@/hooks/use-authenticate'
import { ComponentType, JSX } from 'react'

const withAuth = <P extends object>(Component: ComponentType<P>) => {
	const AuthenticatedComponent = (props: JSX.IntrinsicAttributes & P) => {
		const { loading, error } = useAuthenticate()

		if (loading) return null
		if (error) return <div>Error: {error.message}</div>

		return <Component {...props} />
	}

	AuthenticatedComponent.displayName = `withAuth(${Component.displayName || Component.name || 'Component'})`

	return AuthenticatedComponent
}

export default withAuth
