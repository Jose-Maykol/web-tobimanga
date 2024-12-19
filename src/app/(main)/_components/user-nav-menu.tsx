import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { useAuthStore } from '@/app/stores/auth-store'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LogOut, Settings, User } from 'lucide-react'
import { toast } from 'sonner'

export default function UserNavMenu() {
	const { isAuthenticated, getUser, logout } = useAuthStore()
	const { username, profileImage, email } = getUser() || {}

	const handleLogout = () => {
		logout()
		toast.success('Sesión cerrada')
	}

	return (
		<>
			{isAuthenticated ? (
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Avatar>
							<AvatarImage src={profileImage ?? ''} alt={username} />
							<AvatarFallback>{username ? username[0] : ''}</AvatarFallback>
						</Avatar>
					</DropdownMenuTrigger>
					<DropdownMenuContent align='end'>
						<DropdownMenuLabel>
							<div className='flex flex-col justify-center gap-1 items-center'>
								<div>
									<Avatar className='size-24'>
										<AvatarImage src={profileImage ?? ''} alt={username} />
										<AvatarFallback>{username ? username[0] : ''}</AvatarFallback>
									</Avatar>
								</div>
								<div className='mt-2'>
									<p className='text-lg font-semibold'>{username}</p>
								</div>
								<div>
									<p className='text-xs text-muted-foreground'>{email}</p>
								</div>
							</div>
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							{/* <Link href='/profile'>Perfil</Link> */}
							<div className='flex flex-row gap-2 items-center'>
								<User className='size-4' />
								<p>Perfil</p>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem>
							{/* <Link href='/settings'>Configuración</Link> */}
							<div className='flex flex-row gap-2 items-center'>
								<Settings className='size-4' />
								<p>Configuración</p>
							</div>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={handleLogout}>
							<div className='flex flex-row gap-2 items-center'>
								<LogOut className='size-4' />
								<p>Cerrar sesión</p>
							</div>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			) : (
				<Link
					href='/login'
					className='flex items-center gap-2 text-lg font-semibold md:text-base text-foreground transition-colors hover:text-foreground'
				>
					<Button variant='outline' size='lg'>
						Iniciar sesión
					</Button>
				</Link>
			)}
		</>
	)
}
