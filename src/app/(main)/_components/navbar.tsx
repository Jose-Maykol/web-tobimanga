'use client'

import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { LibraryBig, Menu } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navbar() {
	const pathname = usePathname()

	return (
		<>
			<nav className='hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6'>
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
			</Sheet>
		</>
	)
}
