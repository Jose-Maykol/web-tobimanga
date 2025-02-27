import Image from 'next/image'
import { ReactNode } from 'react'

export default function RootLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<div className='w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]'>
			<div className='flex items-center justify-center py-12'>
				<div className='mx-auto grid w-[350px] gap-6'>
					<div className='grid gap-2 text-center'>
						<h1 className='text-3xl font-bold'>Bienvenido a Tobimanga</h1>
						<p className='text-balance text-muted-foreground'>Inicia sesión para continuar</p>
					</div>
					{children}
				</div>
			</div>
			<div className='hidden bg-muted lg:block'>
				<Image
					src='/images/login.jpg'
					alt='Image'
					width='1920'
					height='1080'
					className='h-full max-h-screen w-full object-cover dark:brightness-[0.6]'
				/>
			</div>
		</div>
	)
}
