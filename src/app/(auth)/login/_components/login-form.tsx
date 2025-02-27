'use client'

import { Button } from '@/components/ui/button'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { loginFormSchema } from '../_schemas/login-form-schema'
import { useAuthStore } from '@/app/stores/auth-store'
import { toast } from 'sonner'
import { isApiError } from '@/utils/is-api-error'

export default function LoginForm() {
	const { login } = useAuthStore()
	const router = useRouter()
	const searchParams = useSearchParams()
	const redirectTo = searchParams.get('redirect')

	const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
		try {
			const response = await login(values.email, values.password)
			if (response) {
				toast.success(response.message)
				router.push(redirectTo || '/')
			}
		} catch (error: unknown) {
			if (isApiError(error)) {
				toast.error(error.message)
			}
		}
	}

	const form = useForm<z.infer<typeof loginFormSchema>>({
		resolver: zodResolver(loginFormSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})

	return (
		<Form {...form}>
			<form className='grid gap-4' onSubmit={form.handleSubmit(onSubmit)}>
				<div className='grid gap-2'>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Correo electrónico</FormLabel>
								<FormControl>
									<Input id='email' type='email' onChange={field.onChange} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<div className='grid gap-2'>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<div className='flex items-center'>
									<FormLabel>Contraseña</FormLabel>
									<Link href='/forgot-password' className='ml-auto inline-block text-sm underline'>
										¿Olvidaste tu contraseña?
									</Link>
								</div>
								<FormControl>
									<Input id='password' type='password' onChange={field.onChange} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<Button type='submit' className='w-full'>
					Iniciar sesión
				</Button>
				<Button variant='outline' className='w-full'>
					Continuar con Google
				</Button>
			</form>
		</Form>
	)
}
