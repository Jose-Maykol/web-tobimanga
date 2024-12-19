import Link from 'next/link'
import LoginForm from './_components/login-form'

export default function LoginPage() {
	return (
		<>
			<LoginForm />
			<div className='mt-4 text-center text-sm'>
				<span>¿No tienes una cuenta?</span>{' '}
				<Link href='#' className='underline'>
					Regístrate
				</Link>
			</div>
		</>
	)
}
