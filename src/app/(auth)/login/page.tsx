'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import LoginForm from './_components/login-form'

export default function LoginPage() {
	const router = useRouter()

	const handleLogin = () => {
		console.log('Login')
		router.push('/')
	}

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
