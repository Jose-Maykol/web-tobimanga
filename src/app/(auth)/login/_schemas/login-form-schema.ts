import { z } from 'zod'

export const loginFormSchema = z.object({
	email: z
		.string({
			required_error: 'Debes ingresar tu correo electrónico'
		})
		.email('Debes ingresar un correo electrónico válido'),
	password: z
		.string({
			required_error: 'Debes ingresar tu contraseña'
		})
		.min(6, 'La contraseña debe tener al menos 6 caracteres')
})
