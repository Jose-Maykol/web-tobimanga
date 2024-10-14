'use client'

import { useAuthStore } from '@/app/stores/auth-store'

import { Button } from '@/components/ui/button'

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { LibraryBig, LogOut, Menu, Settings, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import UserNavMenu from './user-nav-menu'

export default function Navbar() {
	const pathname = usePathname()

	console.log('Navbar rendered')

	return (
		<>
			<nav className='hidden md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6 gap-6 text-lg font-medium w-full'>
				<Link
					href='/'
					className='flex items-center gap-2 text-lg font-semibold md:text-base text-foreground transition-colors hover:text-foreground'
				>
					<LibraryBig />
					<h1>Tobimanga</h1>
					<span className='sr-only'>Tobimanga</span>
				</Link>
				<Link
					href='/'
					className={`transition-colors hover:text-foreground ${pathname === '/' ? 'text-foreground' : 'text-muted-foreground'}`}
				>
					Inicio
				</Link>
				<Link
					href='/mangas'
					className={`transition-colors hover:text-foreground ${pathname === '/mangas' ? 'text-foreground' : 'text-muted-foreground'}`}
				>
					Mangas
				</Link>
				<Link
					href='/statistics'
					className={`transition-colors hover:text-foreground ${pathname === '/statistics' ? 'text-foreground' : 'text-muted-foreground'}`}
				>
					Estadisticas
				</Link>
			</nav>
			<div className='flex flex-row justify-between w-full md:w-auto'>
				<Sheet>
					<SheetTrigger asChild>
						<Button variant='outline' size='icon' className='shrink-0 md:hidden'>
							<Menu className='h-5 w-5' />
							<span className='sr-only'>Toggle navigation menu</span>
						</Button>
					</SheetTrigger>
					<SheetContent side='left'>
						<SheetHeader>
							<SheetTitle>
								<div className='flex flex-row items-center gap-2 pb-6'>
									<LibraryBig />
									<h1>Tobimanga</h1>
								</div>
							</SheetTitle>
						</SheetHeader>
						<nav className='grid gap-6 text-lg font-medium'>
							<Link
								href='/'
								className={`transition-colors hover:text-foreground ${pathname === '/' ? 'text-foreground' : 'text-muted-foreground'}`}
							>
								Inicio
							</Link>
							<Link
								href='/mangas'
								className={`transition-colors hover:text-foreground ${pathname === '/mangas' ? 'text-foreground' : 'text-muted-foreground'}`}
							>
								Mangas
							</Link>
							<Link
								href='/statistics'
								className={`transition-colors hover:text-foreground ${pathname === '/statistics' ? 'text-foreground' : 'text-muted-foreground'}`}
							>
								Estadisticas
							</Link>
						</nav>
					</SheetContent>
					<UserNavMenu />
				</Sheet>
			</div>
		</>
	)
}
