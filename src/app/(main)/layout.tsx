'use client'

import Navbar from './_components/navbar'

export default function MainLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main className='flex min-h-screen w-full flex-col'>
			<header className='sticky top-0 flex h-16 items-center gap-4 bg-background px-4 md:px-6'>
				<Navbar />
			</header>
			<div className='flex w-full p-4'>{children}</div>
		</main>
	)
}
