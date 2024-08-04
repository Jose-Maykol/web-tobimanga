'use client'

import Image from 'next/image'
import Link from 'next/link'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = () => {
    console.log('Login')
    router.push('/')
  }

  return (
    <>
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="email"
            /* placeholder="maykol@example.com" */
            required
          />
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Contraseña</Label>
            <Link
              href="/forgot-password"
              className="ml-auto inline-block text-sm underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
          <Input id="password" type="password" required />
        </div>
        <Button type="submit" className="w-full" onClick={ handleLogin }>
          Iniciar sesión
        </Button>
        <Button variant="outline" className="w-full">
          Continuar con Google
        </Button>
      </div>
      <div className="mt-4 text-center text-sm">
        <span>¿No tienes una cuenta?</span>{' '}
        <Link href="#" className="underline">
          Regístrate
        </Link>
      </div>
    </>
  )
}
