import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const token = request.cookies.get('access_token')
	const { pathname } = request.nextUrl

	console.log('token', token)

	if (token && pathname === '/login') {
		return NextResponse.redirect(new URL('/', request.url))
	}

	console.log('authMiddleware')

	return NextResponse.next()
}

export const config = {
	matcher: ['/login']
}
