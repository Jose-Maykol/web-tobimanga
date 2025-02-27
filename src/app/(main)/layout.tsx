'use client'

import { ReactNode } from 'react'
import Navbar from './_components/navbar'
import withAuth from './_components/with-auth'

function MainLayout({
	children
}: Readonly<{
	children: ReactNode
}>) {
	return (
		<main className='flex min-h-screen w-full flex-col'>
			<div className='bg-gradient-to-b from-background/80 to-transparent h-24 flex w-full fixed top-0 z-10' />
			<header className='fixed top-0 flex h-16 items-center gap-4 px-4 md:px-6 w-full z-50'>
				<Navbar />
			</header>
			<div>{children}</div>
		</main>
	)
}

export default withAuth(MainLayout)
